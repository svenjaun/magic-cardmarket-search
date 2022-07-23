// ==UserScript==
// @name         Cardmarket Card sender
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Click on the Card Titles and export them to target URL
// @author       Swunks [github.com/svenjaun]
// @match        https://www.cardmarket.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cardmarket.com
// @grant        none
// ==/UserScript==

(function() {
    function displayDate() {
        var priceTrend = "__ERROR__"
        var arr = document.querySelectorAll( "#tabContent-info > div > div.col-12.col-lg-6.mx-auto > div > div.info-list-container.col-12.col-md-8.col-lg-12.mx-auto.align-self-start > dl > *");
        
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].textContent == "Price Trend" || arr[i].textContent == "Preis-Trend" || arr[i].textContent == "Tendenza di prezzo") {
                priceTrend = arr[i+1].textContent
            }
        }

        var obj = {
            name: document.getElementsByTagName("h1")[0].firstChild.nodeValue,
            edition: document.querySelector("#tabContent-info > div > div.col-12.col-lg-6.mx-auto > div > div.info-list-container.col-12.col-md-8.col-lg-12.mx-auto.align-self-start > dl > dd:nth-child(6) > div > a.mb-2").firstChild.nodeValue,
            date: new Date().toISOString(),
            priceTrend: priceTrend,
            language: document.querySelector("#footer > div > div.row.d-none.d-lg-flex > div > ul > li.dropup.nav-item.ml-auto > a > span:nth-child(3)").textContent,

        };
        console.log("Request Send:", obj);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(obj));
    }
    'use strict';
    document.getElementsByTagName("h1")[0].addEventListener("click", displayDate);
})();