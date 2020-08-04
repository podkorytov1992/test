const browser = require('browser');
const assert = require('assert');

const getUser = require('helpers/get-user');

describe('проверка формы авторизации', () => {
    it('по номеру телефона', async () => {
        await browser.run('chrome');
        await browser.openPage('https://zarplata.ru/');

        // клик на кнопку на ссылку перехода на форму авторизации 
        await browser.click('/html/body/div[32]/div/div/div/div/div/form/div[5]/a');

        await browser.typeText('/html/body/div[12]/div/div/div/div/div/form/div[1]/div[1]/input', '791390912319');
        await browser.typeText('/html/body/div[8]/div/div/div/div/div/form/div[2]/div/input', 'admin');

        // клик на кнопку "авторизация"
        await browser.click('/html/body/div[2]/div/div[3]/div/form/div/div[2]/button');
        assert.equal(browser.currentLocation, 'https://zarplata.ru/recovery/success');
    });

    it('по email', async () => {
        await browser.run('firefox');
        await browser.openPage('https://zarplata.ru/');

        const openLoginFormSelector = '/html/body/div[32]/div/div/div/div/div/form/div[5]/a';

        // клик на кнопку на ссылку перехода на форму авторизации 
        await browser.click('/html/body/div[32]/div/div/div/div/div/form/div[5]/a');

        // ввод email
        await browser.typeText('/html/body/div[12]/div/div/div/div/div/form/div[1]/div[1]/input', getUser().email);

        // ввод пароля
        await browser.typeText('/html/body/div[8]/div/div/div/div/div/form/div[2]/div/input', getUser().password);
        // клик на кнопку "авторизация"
        await browser.click('/html/body/div[2]/div/div[3]/div/form/div/div[2]/button');

        // assert
        assert.equal(browser.currentLocation, 'https://zarplata.ru/recovery/success');
    });
});
