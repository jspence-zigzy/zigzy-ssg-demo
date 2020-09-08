/**
 * Common Module
 */
const commonModule = (function () {
    const getPageName = (pageUrl) => {
        const pagePath = pageUrl.substr(0, pageUrl.lastIndexOf('.')) || pageUrl;
        return pagePath.replace(/^\/|\/$/g, '');
    };

    const getPageUrl = () => {
        const pathName = window.location.pathname;
        return getPageName(pathName);
    };

    const setActiveNavItem = () => {
        const pageName = getPageUrl();
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
    };

    return {
        setActiveNavItem
    };
})();

commonModule.setActiveNavItem();
