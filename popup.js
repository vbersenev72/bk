const grabBtn = document.getElementById("grabBtn");

grabBtn.addEventListener("click", () => {
    window.a = 0
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        // и если она есть, то выполнить на ней скрипт
        if (tab) {
            execScript(tab);


        } else {
            alert("There are no active tabs")
        }
    })
})


document.getElementById('betBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true }, function (tabs) {
        var tab = tabs[0];
        // и если она есть, то выполнить на ней скрипт
        if (tab) {
            execScript2(tab);
        } else {
            alert("There are no active tabs")
        }
    })
})

/**
 * Выполняет функцию grabImages() на веб-странице указанной
 * вкладки и во всех ее фреймах,
 * @param a
 */

function execScript(tab) {
    try {
        const jj = `${document.getElementById('start').value}-${document.getElementById('countCycle').value}-${document.getElementById('betCycle').value}-${document.getElementById('deposit').value}`
        // Выполнить функцию на странице указанной вкладки
        // и передать результат ее выполнения в функцию onResult
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id, allFrames: true },
                func: (a) => {
                    document.getElementById('BetSlip.Bet.0.AmountInput') ? document.getElementById('BetSlip.Bet.0.AmountInput').value = a : undefined
                },
                args: [jj]
            }
        )
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id, allFrames: true },
                func: start
            }
        )
    } catch (error) {
        console.log(error);
    }
}

function execScript2(tab) {
    try {
        // Выполнить функцию на странице указанной вкладки
        // и передать результат ее выполнения в функцию onResult
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id, allFrames: true },
                func: bet
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const bet = () => {
    try {
        if (document.querySelector('.styled__MarketName-sc-kpdxy9-2')?.innerHTML) {
            window.market = document.querySelector('.styled__MarketName-sc-kpdxy9-2').innerHTML
        }
        if (document.querySelector('.styled__OutcomeName-sc-kpdxy9-3 ')?.innerHTML) {
            window.outcome = document.querySelector('.styled__OutcomeName-sc-kpdxy9-3 ').innerHTML
        }
        if (window.market && window.outcome) {
            document.getElementById('BetSlip.Bet.0').setAttribute('style', 'color:green; border: 2px solid green;')
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Получает список абсолютных путей всех картинок
 * на удаленной странице
 *
 *  @return Array Массив URL
 */
const start = async () => {
    try {
        const deposit = amount => {
            const data = JSON.stringify({
                'amount': amount
            });
            console.log('dep')

            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('POST', 'https://ws.duelbits.com/vault/deposit');
            xhr.setRequestHeader('authority', 'ws.duelbits.com');
            xhr.setRequestHeader('accept', 'application/json, text/plain, */*');
            xhr.setRequestHeader('accept-language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
            xhr.setRequestHeader('authorization', `Bearer ${window.token}`);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function () {
                console.log(xhr.response);
            };

            xhr.send(data);
        }
        const getIdOfBet = (bet) => {
            let xhr = new XMLHttpRequest();
            let matchId = location.pathname.split('-')[0].split('/')[4]
            xhr.withCredentials = true;
            xhr.open('GET', `https://ws.duelbits.com/betradar/events/sr:match:${matchId}/markets?marketIds=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500`);
            xhr.setRequestHeader('authority', 'ws.duelbits.com');
            xhr.setRequestHeader('accept', '*/*');
            xhr.setRequestHeader('accept-language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
            xhr.setRequestHeader('if-none-match', 'W/"12fc-VHYdFXkx/+kq45vFZcrYs6CcqaY"');

            let ke = null

            xhr.onload = function () {
                ke = JSON.parse(xhr.response)
                ke = ke.find(k => k.name === window.market).markets.find(k => {
                    return k.outcomes.find(l => {

                        return l.name === window.outcome
                    })
                }).outcomes.find(l => l.name === window.outcome)
                const date = new Date().toISOString()
                const data = JSON.stringify({
                    'oddsChange': 'none',
                    'bets': [
                        {
                            'type': 'single',
                            'oddsChange': 'none',
                            'selections': [
                                {
                                    'id': ke.id,
                                    'selectionType': 'singleOutcome',
                                    'outcomeIds': ke.id,
                                    'eventId': `sr:match:${matchId}`,
                                    'probabilities': 0,
                                    'timeAdded': date,
                                    'odds': ke.odds
                                }
                            ],
                            'amount': Math.round(bet),
                            'freeBetTicketId': '',
                            'odds': ke.odds,
                            'accaBonusCustomerSubmitted': 0,
                            'accaBonusRuleSetId': ''
                        }
                    ],
                    'type': 'single'
                });

                let xhr2 = new XMLHttpRequest();
                xhr2.withCredentials = true;
                xhr2.open('POST', 'https://ws.duelbits.com/betradar/tickets');
                xhr2.setRequestHeader('authority', 'ws.duelbits.com');
                xhr2.setRequestHeader('accept', '*/*');
                xhr2.setRequestHeader('accept-language', 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7');
                xhr2.setRequestHeader('authorization', `Bearer ${window.token}`);
                xhr2.setRequestHeader('content-type', 'application/json');

                xhr2.onload = function () {
                    console.log('ticket')

                }
                let div = document.createElement('div');
                div.innerHTML = "<strong>send</strong>";
                div.setAttribute('style', 'padding-left:2px')

                xhr2.send(data);
                console.log('send')
                document.querySelector('.styles_HeaderLeftWrapper__17lbh ').append(div)
                return ke
            };
            xhr.onerror = () => {
                console.log('errors', xhr.response)
            }

            xhr.send();
        }


        if (window.a) {
            console.log('start')
            document.getElementById('BetSlip.Submit').removeAttribute("disabled");
            document.getElementById('BetSlip.Submit').children[0].innerHTML = 'STOP';
            window.breaaaaaaks = false
            document.getElementById('BetSlip.Submit').addEventListener('click', () => {
                document.getElementById('BetSlip.Bet.0').setAttribute('style', '')
                document.getElementById('BetSlip.Submit').children[0].innerHTML = 'try bet now';
                window.breaaaaaaks = true
            })
            const aye = document.getElementById('BetSlip.Bet.0.AmountInput').value.split('-')
            window.token = document.cookie.split('; ').find(row => row.startsWith('userToken=')).split('=')[1]
            const start = Number(aye[0]) * 100
            const countCycle = Number(aye[1])
            const betCycle = Number(aye[2]) * 100
            const dep = Number(aye[3])
            window.i = 0;
            let m = 0

            function bets(betNow) {
                try {
                    setTimeout(function () {
                        if (window.breaaaaaaks) {
                            return
                        }
                        // ваши действия
                        if (window.i < 5) {
                            getIdOfBet(betNow)
                            bets(window.betNow);
                            window.i++
                        } else {
                            deposit(Number(dep * 100))
                            Cycle()
                        }

                        // Рекурсивный вызов функции самой себя.

                    }

                        ,
                        6900
                    )
                        ;
                } catch (error) {
                    console.log(error);
                }
            }

            window.betNow = start + betCycle

            async function Cycle() {
                try {
                    window.betNow -= betCycle
                    if (window.breaaaaaaks) {
                        document.getElementById('BetSlip.Bet.0').setAttribute('style', '')
                        document.getElementById('BetSlip.Submit').children[0].innerHTML = 'try bet now';

                        return
                    }
                    console.log('cycle')
                    setTimeout(async () => {
                        if (m < Number(countCycle)) {
                            window.i = 0
                            await bets(window.betNow);

                        } else {
                            document.getElementById('BetSlip.Bet.0').setAttribute('style', '')
                            document.getElementById('BetSlip.Submit').children[0].innerHTML = 'try bet now';
                            return
                        }
                        m++
                    }, 150)
                    //ваши действия


                } catch (error) {
                    console.log(error);
                }
            }

            Cycle();


            // xhr.setRequestHeader('origin', 'https://duelbits.com');
            // xhr.setRequestHeader('referer', 'https://duelbits.com/');
            // xhr.setRequestHeader('sec-ch-ua', '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"');
            // xhr.setRequestHeader('sec-ch-ua-mobile', '?0');
            // xhr.setRequestHeader('sec-ch-ua-platform', '"Windows"');
            // xhr.setRequestHeader('sec-fetch-dest', 'empty');
            // xhr.setRequestHeader('sec-fetch-mode', 'cors');
            // xhr.setRequestHeader('sec-fetch-site', 'same-site');
            // xhr.setRequestHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');


        }
    } catch (error) {
        console.log(error);
    }

}


/**
 * Выполняется после того как вызовы grabImages
 * выполнены во всех фреймах удаленной web-страницы.
 * Функция объединяет результаты в строку и копирует
 * список путей к изображениям в буфер обмена
 *
 * @param frames Массив результатов
 * функции grabImages
 */
function onResult() {
    window.close()
}


