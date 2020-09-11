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

    submitContactForm = (form) => {
        form.preventDefault();
        console.log('Form Data: ', form);
    }
}

let common = new Common();

common.setActiveNavItem();

setTimeout(() => {
    const hasScroll = common.hasVerticalScrollbar();
    if (!hasScroll) {
        common.setMainCssClass();
    }
}, 0);
