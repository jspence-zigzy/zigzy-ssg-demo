/**
 * Common Class
 */
class Common {
    getPageName(pageUrl) {
        const pagePath = pageUrl.substr(0, pageUrl.lastIndexOf('.')) || pageUrl;
        return pagePath.replace(/^\/|\/$/g, '');
    }

    getPageUrl = () => {
        const pathName = window.location.pathname;
        return this.getPageName(pathName);
    }

    setActiveNavItem = () => {
        const pageName = this.getPageUrl();
        const navItemCssClass = 'hdr__menu-item';
        const navItemCssActiveClass = 'hdr__menu-item--is-active';
        const navList = document.querySelectorAll(`.${navItemCssClass}`);

        navList.forEach((item) => {
            const currNavItemName = item.id.substr(3).toLowerCase();
            const currNavItemId = item.id;

            item.classList.remove(navItemCssActiveClass);
            switch (pageName) {
                case '':
                case 'index':
                    document.querySelector('#navHome').classList.add(navItemCssActiveClass);
                    break;
                case currNavItemName:
                    document.querySelector(`#${currNavItemId}`).classList.add(navItemCssActiveClass);
                    break;
            }
        });
    }

    hasVerticalScrollbar = () => {
        if (window.innerHeight) {
            return document.body.offsetHeight > window.innerHeight;
        }

        return (document.documentElement.scrollHeight > document.documentElement.offsetHeight)
            || (document.body.scrollHeight > document.body.offsetHeight);
    }

    setMainCssClass = () => {
        const mainEle = document.querySelector('#main');
        const mainEleCssClass = mainEle.className;
        const mainEleCssClassModifier = `${mainEleCssClass}--auto-height`;
        mainEle.classList.add(mainEleCssClassModifier);
    }

    validateFormField = (field) => {
        const fieldValue = field.value;
        const parentEle = field.parentElement;
        if (fieldValue.length) {
            parentEle.classList.remove('form-field--has-error');
        } else {
            parentEle.classList.add('form-field--has-error');
        }
    }

    submitContactForm = (form) => {
        console.log('Data: ', form);
    }
}

const common = new Common();

common.setActiveNavItem();

setTimeout(() => {
    const hasScroll = common.hasVerticalScrollbar();
    if (!hasScroll) {
        common.setMainCssClass();
    }
}, 0);

submitContactForm = () => {
    let errorArray = [];
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const emailAddress = document.querySelector('#emailAddress');
    const phoneNumber = document.querySelector('#phoneNumber');
    const comments = document.querySelector('#comments');
    const requiredFormFieldArray = [
        firstName,
        lastName,
        emailAddress,
        phoneNumber
    ];

    requiredFormFieldArray.forEach((item) => {
        if (!item.checkValidity()) {
            errorArray.push(item.id);
            item.parentElement.classList.add('form-field--has-error');
        } else {
            item.parentElement.classList.remove('form-field--has-error');
        }
    });

    if (!errorArray.length) {
        common.submitContactForm({
            firstName: firstName.value,
            lastName: lastName.value,
            email: emailAddress.value,
            phone: phoneNumber.value,
            comments: comments.value
        });
    } else {
        setTimeout(() => {
            alert('Please Fix Form Errors');
        }, 0);
    }
};

validateFormField = (ele) => {
    common.validateFormField(ele);
};