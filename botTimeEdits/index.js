const puppeteer = require('puppeteer');

(async () => {

    // open up the browser
    const browser = await puppeteer
        .launch({
            headless: false,
            // devtools: true,
            // slow down operations
            // slowMo: 4,
            defaultViewport: null,
            // args: ['--start-maximized']
        })


    // opens up a new page
    const page = await browser
        .newPage();

    // takes us to toast url
    await page
        .goto("https://pos.toasttab.com",
            {
                waitUntil: 'networkidle2'
            });


    await Promise.all([
        // evaulate method allows for you to execute javascript commands on current page - has no idea what is going on in puppetter

        page.evaluate(() => {
            [...document.querySelectorAll('button')].find(element => element.textContent === 'Allow').click();
        }),

        page.evaluate(() => {
            [...document.querySelectorAll('a')].find(element => element.textContent === 'Login').click();
        }),

        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })

    ]).catch(e => console.log(e));

    // logs us in
    await page.type('[name="username"]', 'jeff@elephantela.com', { delay: 20 });
    await page.type('[name="password"]', '<Sz3dz2kl91<', { delay: 20 });

    // 
    await Promise.all([
        page.click('[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]).catch(e => console.log(e));

    // navigates us to url and waits until background network is semi idle and then watis for 4 seconds
    await Promise.all([
        page.goto("https://www.toasttab.com/restaurants/admin/analytics/home/labor"),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.waitForTimeout(2000)
    ]).catch(e => console.log(e));

    // naviagtes us to time entires page, waits for network to be semi idel and then lets page load for 5 seconds
    await Promise.all([
        page.goto("https://www.toasttab.com/restaurants/admin/reports/home#labor-time-entries"),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.waitForTimeout(3000)
    ]).catch(e => console.log(e));


    // this requires everything inside to be executed on the page
    await Promise.all([
        // sets our page view settings to capture most employees - 100 per page and removes side bar
        await page.evaluate(() => {

            // get ride of side column
            shrink = [...document.querySelectorAll('i.transition')][0].click();
            // click on page per view
            perPageView = [...document.querySelectorAll('a.btn')][1].click();
            view100 = [...document.querySelectorAll("a[data-value='100']")][0].click();

        }),

        // waits 3 seconds before executing next await function
        await page.waitForTimeout(4000),
        // changing to the day before to manipulate data
        // await page.evaluate(() => {
        //     // changes our view to yesterday so we can dial in this application with a days data
        //     perPageView = [...document.querySelectorAll('button.btn.dropdown-toggle')][0].click();
        //     viewyesterday = [...document.querySelectorAll("a[data-value='yesterday']")][0].click();
        //     // updates the page
        //     update = [...document.querySelectorAll('button#update-btn')][0].click();
        // }),

        // await page.waitForTimeout(6000),


        // page evaluate lets us execute javascript code on the page
        await page.evaluate(() => {

            // employees in odd class - scrapes page for them
            oddEmpName = [...document.querySelectorAll('.odd')].map(emp => emp.cells[0].innerHTML);
            oddEmpTitle = [...document.querySelectorAll('.odd')].map(emp => emp.cells[1].innerHTML);
            oddEmpIn = [...document.querySelectorAll('.odd')].map(emp => emp.cells[2].innerHTML);
            oddEmpOut = [...document.querySelectorAll('.odd')].map(emp => emp.cells[3].innerHTML);
            // employees in even class - scrapes page for them
            evenEmpName = [...document.querySelectorAll('.even')].map(emp => emp.cells[0].innerHTML);
            evenEmpTitle = [...document.querySelectorAll('.even')].map(emp => emp.cells[1].innerHTML);
            evenEmpIn = [...document.querySelectorAll('.even')].map(emp => emp.cells[2].innerHTML);
            evenEmpOut = [...document.querySelectorAll('.even')].map(emp => emp.cells[3].innerHTML);
            // capture all employees here
            const oddEmps = [];
            const evenEmps = [];


            // scrapes page and returns all employess with odd class and saves name, title, in time and out time
            for (let i = 0; i < oddEmpName.length; i++) {
                oddEmps.push({
                    name: oddEmpName[i],
                    title: oddEmpTitle[i],
                    in: oddEmpIn[i],
                    out: oddEmpOut[i]
                })
            };

            // scrapes page and returns all employess with even class and saves name, title, in time and out time
            for (let i = 0; i < evenEmpName.length; i++) {
                evenEmps.push({
                    name: evenEmpName[i],
                    title: evenEmpTitle[i],
                    in: evenEmpIn[i],
                    out: evenEmpOut[i]
                })
            };

            // arrays that group employees by thirty minute time edit or severs with one hour time edit
            const serverEmps = [];
            const thirtyMinEdit = [];

            // odd employees who might get their time edited
            for (let i = 0; i < oddEmps.length; i++) {
                if (oddEmps[i].title === "Server" || oddEmps[i].title === "Events Lead") { serverEmps.push(oddEmps[i]) };
                if (oddEmps[i].title === "Busser") { thirtyMinEdit.push(oddEmps[i]) };
                if (oddEmps[i].title === "Bartender") { thirtyMinEdit.push(oddEmps[i]) };
                if (oddEmps[i].title === "Barback") { thirtyMinEdit.push(oddEmps[i]) };
                if (oddEmps[i].title === "Drink Runner" || oddEmps[i].title === "Runner") { thirtyMinEdit.push(oddEmps[i]) };
                if (oddEmps[i].title === "Host" || oddEmps[i].title === "Downstairs Host" || oddEmps[i].title === "Maitre d" || oddEmps[i].title === "Office Assistant" || oddEmps[i].title === "Host") { thirtyMinEdit.push(oddEmps[i]) };
            };
            for (let i = 0; i < evenEmps.length; i++) {
                if (evenEmps[i].title === "Server" || evenEmps[i].title === "Events Lead") { serverEmps.push(evenEmps[i]) };
                if (evenEmps[i].title === "Busser") { thirtyMinEdit.push(evenEmps[i]) };
                if (evenEmps[i].title === "Bartender") { thirtyMinEdit.push(evenEmps[i]) };
                if (evenEmps[i].title === "Barback") { thirtyMinEdit.push(evenEmps[i]) };
                if (evenEmps[i].title === "Drink Runner" || evenEmps[i].title === "Runner") { thirtyMinEdit.push(evenEmps[i]) };
                if (evenEmps[i].title === "Host" || evenEmps[i].title === "Downstairs Host" || evenEmps[i].title === "Maitre d" || evenEmps[i].title === "Office Assistant" || evenEmps[i].title === "Host") { thirtyMinEdit.push(evenEmps[i]) };
            };

            // ---------- This loops through our thirty min time edit employees that have worked or are clocked in ----------------- //
            for (let i = 0; i < thirtyMinEdit.length; i++) {

                // console.log(thirtyMinEdit[i].name)
                // split in time at the space returning a date time AM/PM
                const timeInConversion = thirtyMinEdit[i].in.split(" ");
                // split out time at the space returning undefined if someone is still clocked in else returning date time am/pm
                const timeOutConversion = thirtyMinEdit[i].out.split(" ");

                // puts are time string eg. 4:55 and sets it as timeIn
                timeIn = timeInConversion[1];
                // split the time at : returning 4 55
                timeIn.split(":")
                // sets current date and time to date
                date = new Date();
                // converts current time to two digit mintues
                const twoDigitMinutes = date.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' });

                // ternary operator to return twodigitmintues if employee still clocked on else their clock out time
                const timeOut = (timeOutConversion[1] === undefined) ? twoDigitMinutes : timeOutConversion[1] + " " + timeOutConversion[2];

                // splitting our time out and grabbing am/pm
                const amOrpm = timeOut.split(" ")[1];
                // splitting time out again and grabbing the actual time
                const timeSplitOut = timeOut.split(" ")[0];

                // returns time in seconds whether someone is clocked in at the AM up to 12 or at the PM
                const timeSecondsIn = (timeInConversion[2] === "AM" || timeInConversion[1].split(":")[0] === "12") ? ((Number(timeInConversion[1].split(":")[0]) * 60 + Number(timeInConversion[1].split(":")[1])) * 60) : ((Number(timeInConversion[1].split(":")[0]) * 60 + Number(timeInConversion[1].split(":")[1])) * 60) + 43200;
                // doees the same thing as timesecondsin but for employees out time
                // NEW ISSUE - DOES NOT CATCH EMPLOYEES WHO HAVE CLOCKED IN AT 430PM AND CLOCKED OUT AT 1AM 1am will not be greater than 64800 
                // there is no clock out at the am for the condition so might be able to 
                // // same thing happens here for 12am clock out at the end of the night

                // console.log(timeSplitOut.split(":")[0], "time split")
                const timeSecondsOut = (amOrpm === "AM") ? ((Number(timeSplitOut.split(":")[0]) * 60 + Number(timeSplitOut.split(":")[1])) * 60) : ((Number(timeSplitOut.split(":")[0]) * 60 + Number(timeSplitOut.split(":")[1])) * 60) + 43200;

                // I could create a ternary operator that takes the date, and if it is Friday or Saturday, itll return time in seconds for transiiton period else time in seconds is 5pm transition period and then plug that value into the if statment below

                // if statement telling us if employee should have time edited - THIS IF STATEMENT FOR 5:30PM TRANSITION
                if (timeSecondsIn < 58400 && timeSecondsOut > 63900) {
                    // console.log(timeInConversion[1] + " " + timeInConversion[2]);
                    // console.log(timeOut);
                    console.log(thirtyMinEdit[i].name, " should be in AM & PM Tip Pool");
                };

               
                // 900 = 15 MIN
                // 1800 = 30 MIN
                // 3600 = 1 HOUR
                // 56600 = 3:45PM
                // 57500 = 4:00PM
                // 58400 = 4:15PM
                // 59400 = 430PM
                // 60300 = 4:45PM
                // 61200 = 5PM
                // 62100 = 5:15PM
                // 63000 = 530PM
                // 63900 = 5:45PM
                // 64800 = 6PM
                // 65700 - 6:15PM
                // 66600 = 6:30PM
                // 67200 = 6:40PM

            }

            // ---------- SERVER FOR LOOP ----------------- //
            for (let i = 0; i < serverEmps.length; i++) {
                // split in time at the space returning a date time AM/PM
                const timeInConversion = serverEmps[i].in.split(" ");
                // split out time at the space returning undefined if someone is still clocked in else returning date time am/pm
                const timeOutConversion = serverEmps[i].out.split(" ");

                // puts are time string eg. 4:55 and sets it as timeIn
                timeIn = timeInConversion[1];
                // split the time at : returning 4 55
                timeIn.split(":")
                // sets current date and time to date
                date = new Date();
                // converts current time to two digit mintues
                const twoDigitMinutes = date.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit' });

                // ternary operator to return twodigitmintues if employee still clocked on else their clock out time
                const timeOut = (timeOutConversion[1] === undefined) ? twoDigitMinutes : timeOutConversion[1] + " " + timeOutConversion[2];

                // splitting our time out and grabbing am/pm
                const amOrpm = timeOut.split(" ")[1];
                // splitting time out again and grabbing the acutal time
                const timeSplitOut = timeOut.split(" ")[0];

                // console.log(timeSplitOut.split(":")[0], "time split")


                // returns time in seconds whether someone is clocked in at the AM up to 12 or at the PM
                const timeSecondsIn = (timeInConversion[2] === "AM" || timeInConversion[1].split(":")[0] === "12") ? ((Number(timeInConversion[1].split(":")[0]) * 60 + Number(timeInConversion[1].split(":")[1])) * 60) : ((Number(timeInConversion[1].split(":")[0]) * 60 + Number(timeInConversion[1].split(":")[1])) * 60) + 43200;
                // doees the same thing as timesecondsin but for employees out time - also if this is ran at noon time, current time will mess up algorithm
                // can solve this issue of the 12am clock out by running program at 1030pm or some shit like that
                const timeSecondsOut = (amOrpm === "AM") ? ((Number(timeSplitOut.split(":")[0]) * 60 + Number(timeSplitOut.split(":")[1])) * 60) : ((Number(timeSplitOut.split(":")[0]) * 60 + Number(timeSplitOut.split(":")[1])) * 60) + 43200;

                
                // I could create a ternary operator that takes the date, and if it is Friday or Saturday, itll return time in seconds for transiiton period else time in seconds is 5pm transition period and then plug that value into the if statment below

                // if statement telling us if employee should have time edited - THIS IF STATEMENT FOR 5:00PM TRANSITION
                if (timeSecondsIn < 56600 && timeSecondsOut > 65700) {
                    // console.log(timeInConversion[1] + " " + timeInConversion[2] + " Time In & " + timeOut + " Time Out");
                    // console.log(timeOut);
                    console.log(serverEmps[i].name, " should be in AM & PM Tip Pool");
                };

                // 900 = 15 MIN
                // 1800 = 30 MIN
                // 3600 = 1 HOUR
                // 56600 = 3:45PM
                // 57500 = 4:00PM
                // 58400 = 4:15PM
                // 59400 = 430PM
                // 60300 = 4:45PM
                // 61200 = 5PM
                // 62100 = 5:15PM
                // 63000 = 530PM
                // 63900 = 5:45PM
                // 64800 = 6PM
                // 65700 - 6:15PM
                // 66600 = 6:30PM
                // 67200 = 6:40PM

            }

            // ------------------------------------------------ END 30 minute edit EMPLOYEE LOOP -----------------------------------------------// 

            // if statement checking for second page - This currently does not work
            if ([...document.querySelectorAll('a')].find(element => element.innerHTML === '2') === true) {

                console.log("found 2");
                secondPage = [...document.querySelectorAll('a')].find(element => element.innerHTML === '2').click();

            } else {
                console.log("There is no second page");
            }

        }),


        await page.waitForTimeout(3000),

        // will scrape second page for employee info
        await page.evaluate(() => {

            oddEmpName2 = [...document.querySelectorAll('.odd')].map(emp => emp.cells[0].innerHTML);
            oddEmpTitle2 = [...document.querySelectorAll('.odd')].map(emp => emp.cells[1].innerHTML);
            oddEmpIn2 = [...document.querySelectorAll('.odd')].map(emp => emp.cells[2].innerHTML);
            oddEmpOut2 = [...document.querySelectorAll('.odd')].map(emp => emp.cells[3].innerHTML);
            evenEmpName2 = [...document.querySelectorAll('.even')].map(emp => emp.cells[0].innerHTML);
            evenEmpTitle2 = [...document.querySelectorAll('.even')].map(emp => emp.cells[1].innerHTML);
            evenEmpIn2 = [...document.querySelectorAll('.even')].map(emp => emp.cells[2].innerHTML);
            evenEmpOut2 = [...document.querySelectorAll('.even')].map(emp => emp.cells[3].innerHTML);

            // console.log(oddEmpName, oddEmpTitle, oddEmpIn, oddEmpOut)
            // console.log(evenEmpName, evenEmpTitle, evenEmpIn, evenEmpOut)

            const oddEmps2 = [];
            const evenEmps2 = [];
            // console.log(oddEmpName2.length, "length")
            for (let i = 0; i < oddEmpName2.length; i++) {
                oddEmps2.push({
                    name: oddEmpName2[i],
                    title: oddEmpTitle2[i],
                    in: oddEmpIn2[i],
                    out: oddEmpOut2[i]
                })
            };

            for (let i = 0; i < evenEmpName2.length; i++) {
                evenEmps2.push({
                    name: evenEmpName2[i],
                    title: evenEmpTitle2[i],
                    in: evenEmpIn2[i],
                    out: evenEmpOut2[i]
                })
            }


        })
    ]).catch(e => console.log(e));


})();