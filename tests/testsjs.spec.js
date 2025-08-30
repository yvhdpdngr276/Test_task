import {test,expect} from '@playwright/test'

// Declaration of navigation bar objects
const navigationObjects = {
    visible:{
        mainLinks:{
            Platform : { name:'Platform' , expectedLink: '/platform' , expectedTitle: 'Enterprise Chatbot Builder Platform | BotsCrew'},
            Home : { name:'Home' , expectedLink: '/',expectedTitle: '#1 Chatbot Development Company | BotsCrew '},
            Work : { name:'Our Work', expectedLink: '\/cases\/', expectedTitle: 'Cases Archive - BotsCrew' }
        }
    },
    noVisible : {

        industries : {
            buttonName : 'Industries',

            hiddenLinks : {
                Healthcare : { name:'Healthcare', expectedLink: '/healthcare', expectedTitle: 'HIPAA-Compliant Healthcare Chatbots | BotsCrew' },
                CustomerService : { name:'Customer Service' , expectedLink: '/customer-service' , expectedTitle: 'Best Customer Service Chatbot | BotsCrew'},
                DigitalAgencies : { name:'Digital Agencies' , expectedLink: '/digital-agencies',expectedTitle: 'Whitelabel Chatbot for Digital Agency | BotsCrew'}
            }
        },

        services:{
            buttonName : 'Services',

            hiddenLinks: {
                Enterprise : { name:'Enterprise AI Solutions' , expectedLink: '\/enterprise-ai-solutions\/' , expectedTitle: 'Enterprise AI Solutions'},
                Generative : { name:'Generative AI' , expectedLink: '\/gpt-chatbots\/',expectedTitle: 'Generative AI Development Services | BotsCrew'},
                Discovery  : { name:'Discovery Phase', expectedLink: '/discovery-phase', expectedTitle: 'Discovery Phase for Failproof Chatbot Implementation | BotsCrew' },
                Chatbot    : { name:'Chatbot Reseller', expectedLink: '\/chatbot-reseller\/', expectedTitle: 'Chatbot Reseller Program | BotsCrew' }
            }
        },

        resources : {
          buttonName : 'Resources',

          hiddenLinks : {
              ROI   : { name:'Chatbot ROI calculator' , expectedLink: '/chatbot-roi-calculator',expectedTitle: 'Find Out Chatbot Cost with Chatbot ROI Calculator | BotsCrew'},
              GPT4o : { name:'GPT-4o Prototype Generator', expectedLink: '\/blog\/chatgpt-and-gpt-4-for-business\/', expectedTitle: 'ChatGPT & GPT-4 for Business: How to Customize and Use in 2025' },
              Guide : { name:'GPT Guide', expectedLink: '\/generative-ai-guide\/', expectedTitle: 'Generative AI Guide | BotsCrew' },
              Newsletter : { name:'GPT Newsletter', expectedLink: 'https://blog.botscrew.com/generation-ai', expectedTitle: 'Generation AI' }
          }
        },

        about : {
            buttonName : 'About us',

            hiddenLinks : {
                About   : { name:'About us' , expectedLink: '/about-us' , expectedTitle: 'About Us - BotsCrew'},
                Contact : { name:'Contact us' , expectedLink: '/contact-us',expectedTitle: 'Contact Us | BotsCrew'},
                Process : { name:'Our Process', expectedLink: '/chatbot-development-journey', expectedTitle: 'Chatbot Development Methodology | BotsCrew' },
                Careers : { name:'Careers', expectedLink: '/careers', expectedTitle: 'Change business communication with us' }
            }
        }
    }
}

test.beforeEach(async({page})=>{
    await page.goto('https://botscrew.com/');
})

// Tests for the navigation bar
test.describe('Page navigation bar tests', () => {

    // Tests for initially visible elements that can be navigated to
    test.describe('visible links',()=> {

        Object.entries(navigationObjects.visible.mainLinks).forEach(([key, {name, expectedLink, expectedTitle}]) => {
                test(`Active links verification ${key}`, async ({page}) => {

                    await page.getByRole('navigation').getByRole('link', {name}).click();
                    await page.waitForURL(`**${expectedLink}`);
                    await expect(page).toHaveURL(new RegExp(`.*${expectedLink}`));
                    await expect(page).toHaveTitle(expectedTitle);

                });
            }
        );

    });

    // Tests for elements that are not initially visible and can be accessed only by expanding the menu
    test.describe('No visible links', () => {

        Object.entries(navigationObjects.noVisible).forEach(([sectionKey, {buttonName, hiddenLinks}]) => {

            test.describe(`Section: ${sectionKey}`, () => {

                Object.entries(hiddenLinks).forEach(([linkKey, { name, expectedLink, expectedTitle }]) => {
                    test(`Check hidden link: ${name}`, async ({ page }) => {

                        await page.getByRole('button', {name: buttonName}).click();

                        const linkLocator = page.getByRole('navigation').getByRole('link', { name });
                        await linkLocator.waitFor({ state: 'visible'});

                        await linkLocator.click();

                        await expect(page).toHaveURL(new RegExp(`.*${expectedLink}`));
                        await expect(page).toHaveTitle(expectedTitle);

                    });
                });
            });
        });
    });
});

// Tests for the bot menu
test.describe('Testing of graphical elements and bot functionality on the page',()=> {

    let widgetFrame;

    // Preparation for element testing
    test.beforeEach(async({page})=>{

        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        widgetFrame = page.frameLocator('#botscrew-widget');
        await widgetFrame.locator('#widget-button').click();

    });

    // Testing that the bot panel opens when the button is clicked
    test('Bot Panel Testing Overview',async ({page}) => {

            await expect(widgetFrame.getByText('Welcome! How can I help?I would like to get a price quoteI want to book a demo', { exact: true })).toBeVisible();
    });

    // Testing that the bot sends a response when a message is written and sent
    test('Bot Test input_answer',async ({page}) => {

        await widgetFrame.getByTestId('input').fill('Hello how are you, can you help me ?');
        await widgetFrame.getByRole('button', { name: 'send message' }).click();
        await expect(widgetFrame.locator('.styles_containerWithLogo__maUvf.styles_marginWithQR__ZU5lo > .styles_msgWrapper__fdOTn')).toBeVisible();
    });

    // Testing that the bot sends a response when a prepared question button is clicked
    test('Bot Test button_answer',async ({page}) => {

        await widgetFrame.getByRole('button', { name: 'I would like to get a price quote' }).click();
        await expect(widgetFrame.locator('.styles_containerWithLogo__maUvf.styles_marginWithQR__ZU5lo > .styles_msgWrapper__fdOTn')).toBeVisible();
    });

    // Test that clicking the close (X) button closes the bot window
    test('Bot close button 1',async ({page}) => {

        await widgetFrame.locator('#widget-button').click();
        await expect(widgetFrame.getByText('Welcome! How can I help?I would like to get a price quoteI want to book a demo', { exact: true })).toBeHidden();
    });

    // Test that clicking the minimize button collapses the bot window and makes it invisible to the user
    test('Bot close button 2',async ({page}) => {

        await widgetFrame.getByRole('button', { name: 'wrap widget' }).click();
        await expect(widgetFrame.getByText('Welcome! How can I help?I would like to get a price quoteI want to book a demo', { exact: true })).toBeHidden();
    });

    // Test that the bot does not respond to an empty message ('intentionally set to fail')
    test.fail('Bot Test void input',async ({page}) => {

        await widgetFrame.getByTestId('input').fill('');
        await widgetFrame.getByRole('button', { name: 'send message' }).click();
        await expect(widgetFrame.locator('.styles_containerWithLogo__maUvf.styles_marginWithQR__ZU5lo > .styles_msgWrapper__fdOTn')).toBeVisible();
    });
});

// Test of the top page banner and that it closes when the button is clicked
test.describe('Testing of banner',()=> {

    test('Bot close button 2',async ({page}) => {

        await page.getByRole('img', { name: 'close icon' }).click();
        await expect(page.locator('div.header-banner.hide')).toBeVisible();
    });
});