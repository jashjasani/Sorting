function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = document.cookie; //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return (res);
}
function renderData(data) {
    const colList = document.getElementsByClassName("collection-list w-dyn-items w-row")[0];
    colList.style.display="block";
    const noResultsFound = document.getElementsByClassName("no-results-wrapper")[0];
    noResultsFound.style.display="none";
    // if (data) {
    //     const emptyElements = document.getElementsByClassName('w-dyn-empty')[0];
    //     emptyElements.style.display = 'none';
    // }

    const resultsCount = document.getElementsByClassName("results-count")[0];
    const replaceResultsCount = document.createElement('div');
    replaceResultsCount.className = "results-count";
    const span = document.createElement('span');
    span.textContent = data.count + " Ergebnisse von ";
    const span2 = document.createElement('span');
    span2.textContent = data.totalCount;
    replaceResultsCount.append(span, span2);
    resultsCount.replaceWith(replaceResultsCount);


    const arrayClasses = ["Asien", "Bühne", "Erotik", "Feste", "P-Film", "Sport", "Genre", "Gesellschaft", "Kultur",
        "Reisen", "Landschaften", "Literatur", "P-Malerei", "Mode", "M-Mensch", "Natur", "P-Politik", "M-Sache",
        "Technik", "Mensch", "M-Tier", "Titelseite", "P-Militär"];

    //fragment creation to enhance load speed
    let fragment = document.createDocumentFragment();

    //grabbing collection elements to later add fragment
    const list = document.getElementsByClassName("w-dyn-list")[0];
    var collection;
    if (document.getElementsByClassName("w-dyn-items w-row")[0]) {
        collection = document.getElementsByClassName("w-dyn-items w-row")[0];
        collection.innerHTML = "";
    } else {
        collection = document.createElement("div");
        collection.className = "w-dyn-items w-row";
    }
    // collection.className = "w-dyn-items w-row";

    //collection.innerHTML = " ";
    //
    //
    
    for (q of data.magazines) {
        // class_list.push('')
        let productWrapper = document.createElement("div");
        productWrapper.className = "archive-col-item w-dyn-item w-col w-col-3";
        console.log(q.Name);
        //image wraper link creation
        var productImgWrapper = document.createElement("a");
        productImgWrapper.href="https://bildzeitschrift.webflow.io/product-template?productId="+q.SKU;
        productImgWrapper.className = "produvt-img-wrapper w-inline-block";

        //img element creation
        var img = document.createElement("img");
        img.className = "product-img";
        img.src = "https://res.cloudinary.com/wdy-bzs/image/upload/v1651695832/"+q.Images;
        img.loading = "lazy";
        img.alt = "product-img";

        //product titel creation
        var title = document.createElement("div");
        title.className = "product-title"
        title.innerText = q.Name;
        title.setAttribute("fs-cmsfilter-field", "Titel");

        var issueWrapper = document.createElement("div");
        issueWrapper.className = "issue-wrapper";

        //issue wrapper children elements
        var month = document.createElement("div");
        month.className = "month";
        var dateDivider = document.createElement("div");
        dateDivider.className = "date-divider";
        var year = document.createElement("div");
        year.className = "year";
        year.innerText = q.Year;
        var decade = document.createElement("div");
        decade.className = "decade";

        //classes wrapper children elements 
        var classesWrapper = document.createElement("div");
        classesWrapper.className = "classes-wrapper";

        //assigning 24 sub elements to classes wrapper
        //
        //
        arrayClasses.forEach((item) => {
            var classesWrapperChild = document.createElement("div");
            if (item == "Asien") {
                classesWrapperChild.className = "ort"
            }
            classesWrapperChild.setAttribute("fs-cmsfilter-field", item);
            classesWrapper.append(classesWrapperChild);
        })

        issueWrapper.append(month, dateDivider, year, decade);

        productImgWrapper.append(img, title, issueWrapper, classesWrapper);
        productWrapper.append(productImgWrapper);
        productWrapper.setAttribute("role", "listitem");
        fragment.append(productWrapper);

    }
    collection.append(fragment);
    list.prepend(collection);
    async function pagination() {
        const list = document.getElementsByClassName("w-dyn-list")[0];
        var paginationWrapper;
        if (document.getElementsByClassName("w-pagination-wrapper pagination")[0]) {
            paginationWrapper = document.getElementsByClassName("w-pagination-wrapper pagination")[0];
            paginationWrapper.innerHTML="";
        } else {
            paginationWrapper = document.createElement("div");
            paginationWrapper.className = "w-pagination-wrapper pagination";
        }

        const pageCount = data.pageCount;
        const currentPage = data.currentPage || 1;
        console.log(currentPage);
        const lastQuery = getCookie('lastQuery');
        console.log(lastQuery);
        const pageFragment = document.createDocumentFragment();
        if (currentPage != 1) {
            const leftArrowButton = document.createElement("a");
            leftArrowButton.className = "w-pagination-previous pagination-button-left keep-params";
            leftArrowButton.setAttribute("aria-label", "Previous Page");
            const leftArrowImage = document.createElement("img");
            leftArrowImage.width = "45";
            leftArrowImage.loading = "lazy";
            leftArrowImage.src = "https://res.cloudinary.com/wdy-bzs/image/upload/v1651849092/asset/Arrow.svg";
            leftArrowImage.className = "pagination-arrow left";
            leftArrowButton.append(leftArrowImage);
            pageFragment.append(leftArrowButton);
            if (lastQuery != "") leftArrowButton.href = "?page=" + (currentPage - 1) + ("&" + lastQuery);
            else leftArrowButton.href = "?page=" + (currentPage - 1)
            console.log(currentPage);
        }
        if (pageCount <= 7) {
            for (i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement("a");
                const pageDiv = document.createElement("div");
                pageDiv.textContent = i;
                pageButton.className = "pagination-page-button w-inline-block";
                if (lastQuery != "") pageButton.href = "?page=" + i + ("&" + lastQuery);
                else pageButton.href = "?page=" + i
                pageButton.append(pageDiv);
                pageFragment.append(pageButton);
                if (i == currentPage) {
                    pageButton.className = "pagination-page-button w-inline-block w--current"
                }
            }
            paginationWrapper.append(pageFragment);
        } else {
            if (currentPage < 5) {
                for (i = 1; i <= 5; i++) {
                    const pageButton = document.createElement("a");
                    const pageDiv = document.createElement("div");
                    pageDiv.textContent = i;
                    pageButton.className = "pagination-page-button w-inline-block";
                    if (lastQuery != "") pageButton.href = "?page=" + i + ("&" + lastQuery);
                    else pageButton.href = "?page=" + i
                    pageButton.append(pageDiv);
                    pageFragment.append(pageButton);
                    if (i == currentPage) {
                        pageButton.className = "pagination-page-button w-inline-block w--current"
                    }
                }
                // const pageButton = document.createElement("a");
                // const pageDiv = document.createElement("div");
                // pageDiv.textContent = currentPage+1;
                // pageButton.className = "pagination-page-button w-inline-block";
                // pageButton.href = "?page=" + i + "&" + lastQuery;
                // pageButton.append(pageDiv);
                // pageFragment.append(pageButton);

                const pageDots = document.createElement("div");
                pageDots.textContent = '...';
                pageDots.className = "pagination-dots-button";
                pageFragment.append(pageDots);

                const lastPageButton = document.createElement("a");
                const lastPageDiv = document.createElement("div");
                lastPageDiv.textContent = pageCount;
                lastPageButton.className = "pagination-page-button w-inline-block";
                if (lastQuery != "") lastPageButton.href = "?page=" + pageCount + ("&" + lastQuery);
                else lastPageButton.href = "?page=" + pageCount
                lastPageButton.append(lastPageDiv);
                pageFragment.append(lastPageButton);
                paginationWrapper.append(pageFragment);
            }
            else if (currentPage >= 5 && currentPage <= (pageCount - 4)) {
                const firstPageButton = document.createElement("a");
                const firstPageDiv = document.createElement("div");
                firstPageDiv.textContent = "1";
                firstPageButton.className = "pagination-page-button w-inline-block";
                if (lastQuery != "") firstPageButton.href = "?page=" + "1" + ("&" + lastQuery);
                else firstPageButton.href = "?page=" + "1"
                firstPageButton.append(firstPageDiv);
                pageFragment.append(firstPageButton);

                const pageDots = document.createElement("div");
                pageDots.textContent = '...';
                pageDots.className = "pagination-dots-button";
                pageFragment.append(pageDots);
                var j = currentPage - 1;
                for (i = 0; i < 3; i++) {
                    console.log(currentPage);
                    const pageButton = document.createElement("a");
                    const pageDiv = document.createElement("div");
                    pageDiv.textContent = j;
                    pageButton.className = "pagination-page-button w-inline-block";
                    if (lastQuery != "") pageButton.href = "?page=" + j + ("&" + lastQuery);
                    else pageButton.href = "?page=" + j
                    pageButton.append(pageDiv);
                    pageFragment.append(pageButton);
                    if (j == currentPage) {
                        pageButton.className = "pagination-page-button w-inline-block w--current"
                    }
                    j++;
                }
                const midPageDots = document.createElement("div");
                midPageDots.textContent = '...';
                midPageDots.className = "pagination-dots-button";
                pageFragment.append(midPageDots);

                const lastPageButton = document.createElement("a");
                const lastPageDiv = document.createElement("div");
                lastPageDiv.textContent = pageCount;
                lastPageButton.className = "pagination-page-button w-inline-block";
                if (lastQuery != "") lastPageButton.href = "?page=" + i + ("&" + lastQuery);
                else lastPageButton.href = "?page=" + i
                lastPageButton.append(lastPageDiv);
                pageFragment.append(lastPageButton);
                paginationWrapper.append(pageFragment);
            }
            else {
                const firstPageButton = document.createElement("a");
                const firstPageDiv = document.createElement("div");
                firstPageDiv.textContent = "1";
                firstPageButton.className = "pagination-page-button w-inline-block";
                if (lastQuery != "") firstPageButton.href = "?page=" + "1" + ("&" + lastQuery);
                else firstPageButton.href = "?page=" + "1"
                firstPageButton.append(firstPageDiv);
                pageFragment.append(firstPageButton);

                const pageDots = document.createElement("div");
                pageDots.textContent = '...';
                pageDots.className = "pagination-dots-button";
                pageFragment.append(pageDots);

                for (i = pageCount - 4; i <= pageCount; i++) {
                    const pageButton = document.createElement("a");
                    const pageDiv = document.createElement("div");
                    pageDiv.textContent = i;
                    pageButton.className = "pagination-page-button w-inline-block";
                    if (lastQuery != "") pageButton.href = "?page=" + i + ("&" + lastQuery);
                    else pageButton.href = "?page=" + i

                    pageButton.append(pageDiv);
                    pageFragment.append(pageButton);
                    if (i == currentPage) {
                        pageButton.className = "pagination-page-button w-inline-block w--current"
                    }
                    j++;
                }
                paginationWrapper.append(pageFragment)
            }
        }
        list.append(paginationWrapper);
    }
    pagination();
}

async function loadFileteredData() {
    setTimeout(() => {
        //   const oldData = document.getElementsByClassName("w-dyn-items w-row")[0];
        //   oldData.remove();
        const checkboxWrappers = document.getElementsByClassName('checkbox-element-wrapper')
        const resetAllButton = document.getElementsByClassName('reset-all-btn')[0];
        resetAllButton.addEventListener("mouseup", loadFileteredData);
        for (q of checkboxWrappers) {
            q.addEventListener("mouseup", loadFileteredData)
        }
        var url = window.location.href
        var getQuery = url.split('?')[1]
        var queryCookie = "";
        if (getQuery) {
            var apartFrompage = getQuery.split('&');
            for (i = 1; i < apartFrompage.length; i++) {
                if (i == apartFrompage.length - 1) {
                    queryCookie += apartFrompage[i];
                } else {
                    queryCookie = queryCookie + apartFrompage[i] + "&";
                }
                console.log(queryCookie);
            }
        }
        if(getQuery){
            document.cookie = "lastQuery=" + getQuery;
        }
        else{
            document.cookie="lastQuery="
        }
        getCookie('lastQuery');
        if (getQuery) {

            fetch('https://the-awesome-jashjasani-site.netlify.app/.netlify/functions/loadData?' + getQuery)
                .then(resp => resp.json())
                .then(data => renderData(data))
        }
        else {
            fetch('https://the-awesome-jashjasani-site.netlify.app/.netlify/functions/loadData')
                .then(resp => resp.json())
                .then(data => renderData(data))
        }
    }, 100)
}
document.addEventListener("DOMContentLoaded", async function () {
    function requestData() {
        const resetAllButton = document.getElementsByClassName('reset-all-btn')[0];
        resetAllButton.addEventListener("mouseup", loadFileteredData);
        const checkboxWrappers = document.getElementsByClassName('checkbox-element-wrapper')
        for (q of checkboxWrappers) {
            q.addEventListener("mouseup", loadFileteredData)
        }
        setTimeout(() => {
            var url = window.location.href
            var getQuery = url.split('?')[1]
            var queryCookie = "";
            if (getQuery) {
                var apartFrompage = getQuery.split('&');
                for (i = 1; i < apartFrompage.length; i++) {
                    if (i == apartFrompage.length - 1) {
                        queryCookie += apartFrompage[i];
                    } else {
                        queryCookie = queryCookie + apartFrompage[i] + "&";
                    }
                }
            }
            if(getQuery){
                document.cookie = "lastQuery=" + getQuery;
            }
            else{
                document.cookie="lastQuery="
            }
            if (getQuery) {
                fetch('https://the-awesome-jashjasani-site.netlify.app/.netlify/functions/loadData?' + getQuery)
                    .then(resp => resp.json())
                    .then(data => renderData(data))
            }
            else {
                fetch('https://the-awesome-jashjasani-site.netlify.app/.netlify/functions/loadData?page=1')
                    .then(resp => resp.json())
                    .then(data => renderData(data))
            }
        }, 100)
    }

    loadFileteredData();
    //requestData();
})
