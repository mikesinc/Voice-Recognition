A voice recognition web application using the IBM Watson Speech-to-Text API.

Clone this repo.

Run the app:

**npm run dev**

This website uses the **IBM Watson speech token lite plan**, which expires after **30 days** of inactivity or **after 100 minutes of use**.

**You must set your own IBM Watson API credential** in the environment variables (.env file) as:

SPEECH_TO_TEXT_IAM_APIKEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX".

You can obtain your own IBM Watson API credential from their website (after making an account and following the steps below):

1. Create an instance of the Speech to Text service and get your credentials:
2. Go to the Speech to Text page in the IBM Cloud Catalog.
3. Log in to your IBM Cloud account.
4. Click Create.
5. Click Show to view the service credentials.
6. Copy the apikey value into your .env file (make a .env in root directory).
