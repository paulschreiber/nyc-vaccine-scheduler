# nyc-vaccine-scheduler
A script that automates the NYC Vaccine Schedule process

## Please note:

- This script **only works with the NYC Vaccine Schedule** page: https://vax4nyc.nyc.gov/patient/s/vaccination-schedule
- This script will try to select **whatever appears as the FIRST time slot** on the list and stop at the next page.
- This script only tested with **Chrome**.

## How-to

- In Chrome, open the NYC Vaccine Schedule Page: https://vax4nyc.nyc.gov/patient/s/vaccination-schedule
- Fill out the first page and the second page of the form, and stop at the "Schedule an Appointment" page, like below:
  ![Sccheudle an Appointment Page](https://i.imgur.com/202Rs2b.png)

- Open up the DevTools in Chrome, and select Console tab. [Check here if you don't know how](https://developer.chrome.com/docs/devtools/open/).
  ![Sccheudle an Appointment Page](https://i.imgur.com/BXdJHAP.png)

- Copy and paste the entire code in `script.js` to the console, and hit Enter (to run the codes). Then you will see the script trying repeatedly.
  ![Sccheudle an Appointment Page](https://i.imgur.com/rWzBZg2.png)

- When the script found a time slot, it will select the first time slot and go to the next page. You will see the **Location information** in the console output:
  - If this happens, the script will refresh the page and keep trying. E.g.:
  ![Sccheudle an Appointment Page](https://i.imgur.com/ZOSNA1Q.png)

- When the script successfully enters the next page with a time slot, it will stop. In the meantile, it will open a new tab to a Youtube video in order to make a sound as a notification.
  - You can change the URL to whatever you like in the `script.js`.

## Other notes

- This script is created in a fairly short period of time. It may not follow the best practices of Javascript programming.

- This script may not work in browers other than Chrome, as different browsers may behavior differently.

- Please feel free to submit a pull request if you'd like to improve this script.

- For other issues, please file issues in this Github.

Thank you and good luck! 🤞
