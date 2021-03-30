
// https://vax4nyc.nyc.gov/patient/s/vaccination-schedule

let timerId;
let refreshSeconds = 0.3;
let waitForResult = 1;
let date = new Date();
let searchDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
let zipCode = '10011'

function callbackWhenFound() {
  // Add your own callback action.
  // E.g. open to a Youtube page to make a sound.
  window.open('https://www.youtube.com/watch?v=V2QUYX0DjVA', '_blank');
  window.focus();
}

function cleanUpAllTimers() {
  timerId = window.setTimeout(function () { }, 0);
  while (timerId--) {
      window.clearTimeout(timerId); // will do nothing if no timeout with id is present
  }
}

function getNowTime() {
  var d = new Date;
  return [
    d.getMonth()+1,
    d.getDate(),
    d.getFullYear()].join('/')+' '+
  [
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':');
}

function repeat() {
  // Set datepicker to today in M/D/YYYY format.
  document.querySelector('c-vcms-schedule-flow')
    .shadowRoot.querySelector('main').querySelector('c-vcms-book-appointment')
    .shadowRoot.querySelector('article > div > div:nth-child(1) lightning-input')
    .shadowRoot.querySelector('lightning-datepicker')
    .shadowRoot.querySelector('input').value = searchDate;

  // Change zipcode
  let zipCodeElement = document.querySelector('c-vcms-schedule-flow')
    .shadowRoot.querySelector('main').querySelector('c-vcms-book-appointment')
    .shadowRoot.querySelector('article > div > div:nth-child(2) lightning-input')
    .shadowRoot.querySelector('input');
  zipCodeElement.value = '';
  zipCodeElement.value = zipCode;

  setTimeout(() => {
    try {
      // Try to find the radio button of the first slot.
      let radioButton = document.querySelector('c-vcms-schedule-flow')
        .shadowRoot.querySelector('main').querySelector('c-vcms-book-appointment')
        .shadowRoot.querySelector('input.card-input-element');
      if (radioButton) {
        console.log(getNowTime() + ' - !!!!!!! 🤣 Found time slot button !!!!!!');

        // Trying to click the radio button of the FIRST time slot.
        setTimeout(() => {
          console.log(getNowTime() + ' - Trying to click the time slot.');

          // Select first time slot.
          radioButton.click();
          callbackWhenFound();

          setTimeout(() => {
            // Click the Next button again, in case the button is not ready at the first time.
            radioButton.click();

            // Print the location in the console.
            let details = document.querySelector('c-vcms-schedule-flow')
              .shadowRoot.querySelector('main').querySelector('c-vcms-book-appointment')
              .shadowRoot.querySelector('fieldset').innerText;
            console.log('🤣 Found Time Slot:');
            console.log(details + '\n');

            // Click the Next button.
            document.querySelector('c-vcms-schedule-flow')
              .shadowRoot.querySelector('#skipToNext-0').click();

            // Wait for a second and check if this time slot is still available.
            setTimeout(() => {
              console.log('😰 Checking if Find Another Appointment exists...');

              let findAnotherButton = document.querySelector('c-vcms-schedule-flow')
                .shadowRoot.querySelector('main').querySelector('c-vcms-book-appointment')
                .shadowRoot.querySelector('div.centered-modal lightning-button')
                .shadowRoot.querySelector('button[title="Find Another Appointment"]');

              if (findAnotherButton) {
                  console.log('😰 Unfortunately, this time slot is no longer available...');
                  findAnotherButton.click();
                  timerId = setTimeout(repeat, refreshSeconds * 1000);
              }
            }, 1000);
          }, 100);
        }, 200);
      } else {
        console.log(getNowTime() + ' - 😰 Time slot not found... ');
        timerId = setTimeout(repeat, refreshSeconds * 1000);
      }

    } catch (e) {
      console.error(e);
      timerId = setTimeout(repeat, refreshSeconds * 1000);
    }
  }, waitForResult * 1000);
}

cleanUpAllTimers();
timerId = setTimeout(repeat, 100);

// To stop the timer, run the following:
// cleanUpAllTimers();
