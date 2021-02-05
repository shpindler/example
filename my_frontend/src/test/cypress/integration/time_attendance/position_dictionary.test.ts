import { generalPermissionsURL } from '@/api/general-permissions'
import { positionsListURL } from '@/api/position'
import { settingsPermissionsURL } from '@/api/settings'
import { userURL } from '@/api/user'

context('Настройки справочника должностей', () => {
  beforeEach(() => {
    cy.server()
    cy.route(userURL, 'fx:user/root.json').as('fetchUser')
    cy.route(generalPermissionsURL, 'fx:permissions/main/root.json').as(
      'fetchGeneralPermissions',
    )
    cy.route(settingsPermissionsURL, 'fx:permissions/settings/root.json').as(
      'fetchSettingsPermissions',
    )
    cy.route(
      positionsListURL({}),
      'fx:settings/position-positions/default.json',
    ).as('fetchPositions')
    cy.visit(
      'http://localhost:3000/timeattendance/accounts/profile/positiondictionary',
    )
    cy.wait('@fetchUser')
    cy.wait('@fetchGeneralPermissions')
    cy.wait('@fetchSettingsPermissions')
    cy.wait('@fetchPositions')
  })

  it('при клике на кнопку "Добавить должность" открывается пустая форма.', () => {
    cy.get('[data-test-id="add-position"]').click()
    cy.get('[data-test-id="position-form"]').should('be.visible')
    cy.get('[data-test-id="position-name"]').should('have.value', '')
    cy.get('[data-test-id="position-code"]').should('have.value', '')
  })

  it('при сохранении формы должности изменения отображаются в списке, а сама форма закрывается.', () => {
    cy.get('[data-test-id="position-1"]').click()
    cy.get('[data-test-id="position-name"]').type('Test name')
    cy.get('[data-test-id="position-form"]')
      .find('button[type="submit"]')
      .click()
    // cy.wait(400)
    cy.get('body')
      .find('[data-test-id="position-form"]')
      .should('have.length', 0)
    cy.get('[data-test-id="position-1"]').contains('Test name')
  })

  it('при клике на элемент списка открывается форма с данными должности.', () => {
    cy.get('[data-test-id="position-1"]').click()
    cy.get('[data-test-id="position-form"]').should('be.visible')
    cy.get('[data-test-id="position-name"]').should('have.value', 'name 1')
    cy.get('[data-test-id="position-code"]').should('have.value', 'code 1')
  })

  it('при клике на иконку удаления открывается окно подтверждения.', () => {
    cy.get('[data-test-id="position-1"]')
      .find('[data-test-id="delete-btn"]')
      .click()
    cy.get('[data-test-id="position-delete-form"]').should('be.visible')
  })

  it('после подтверждения удаления должности она удаляется из списка, и окно подтверждения закрывается.', () => {
    const item = '[data-test-id="position-1"]'
    cy.get(item).find('[data-test-id="delete-btn"]').click()
    const form = '[data-test-id="position-delete-form"]'
    cy.get(form).find('button[type="submit"]').click()
    // cy.wait(400)
    cy.get('body').find(form).should('have.length', 0)
    cy.get('body').find(item).should('have.length', 0)
  })

  it('при вводе поисковой строки происходит фильтрация списка по вхождению подстроки в название должности.', () => {
    cy.get('[data-test-id="search"]').type('name 2')
    cy.get('[data-test-id*="position-"]').should('have.length', 8)
  })

  it('при кликах на элементы пагинатора происходит смена страниц.', () => {
    cy.get('[data-test-id="pagination-item"]:nth-child(4)').click()
    cy.get('[data-test-id="position-11"]').should('be.visible')
  })

  it('текущая страница и поисковая строка присутствуют в GET-параметрах.', () => {
    cy.get('[data-test-id="search"]').type('name')
    cy.get('[data-test-id="pagination-item"]:nth-child(4)').click()
    cy.location('search').should('eq', '?page=2&search=name')
  })

  it('при клике на кнопку "Скачать Excel" происходит скачивание списка должностей в формате XLSX.', () => {
    cy.get('[data-test-id="excel-btn"]').should(
      'have.attr',
      'href',
      urls.xlsxPositions,
    )
  })

  it('кол-во объектов на странице отображается в GET строке.', () => {
    cy.get('[data-test-id="pageSize"]').clear()
    cy.location('search').should('eq', '?page_size=1')
  })

  it('при задании кол-ва объектов на странице список применяет изменения.', () => {
    cy.get('[data-test-id="pageSize"]').clear()
    cy.get('[data-test-id*="position-"]').should('have.length', 1)
  })
})
