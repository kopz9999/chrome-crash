# Chrome Crash

Chrome extension to post current web page content into an authenticated
Meteor endpoint that is acting as a Webhook. This extension assumes you are
working with [Meteor](https://www.meteor.com/) and
[Restivus](https://github.com/kahmali/meteor-restivus/).

[Icon Source]: http://www.iconarchive.com/show/flat-icons-by-flat-icons.com/Meteor-icon.html

# Installation

This chrome extension has not been published yet, so you can clone the repo and
load it trough [Chrome Apps & Extensions Developer Tool](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc?hl=en)
or [Download the Packaged App](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/chrome-crash.crx).
**Note: Packaged App points to Release 0.1**

# Usage

## Out of the box

This extension will prompt you for basic configuration for the following
required fields:

- Login URL:
  - Api endpoint to login and get an authentication token.
- Webhook URL:
  - Authenticated Api endpoint that acts as webhook and receives information
  from current page.
- Token Header Name:
  - Name of the header for Authentication Token that is gonna be send to the
  authenticated endpoint. This is required for Restivus Authentication.
  - Default: **X-Auth-Token**
- User Id Header Name
  - Name of the header for User Id that is gonna be send to the
  authenticated endpoint. This is required for Restivus Authentication.
  - Default: **X-User-Id**
- Token Response JsonPath
  - JsonPath to retrieve Authentication Token value from response.
  - Default: **$.data.authToken**
- User Id Response JsonPath
  - JsonPath to retrieve User Id value from response.
  - Default: **$.data.userId**
- Username Param
  - Name of the form parameter for username in the api login endpoint
  - Default: **user**
- Password Param
  - Name of the form parameter for password in the api login endpoint
  - Default: **password**
- Webhook Param
  - Name of the form parameter for webpage content in the authenticated api
  webhook endpoint
  - Default: **content**
- Remember Credentials
  - Everytime you login, you credentials will be stored.
  - If you Authentication Token becomes invalid for some reason, Chrome Crash
  will try to renew it by logging again in case you have selected this option.
  If you didn't selected this option, you will have to logout to drop the
  current token and input your credentials again.

![Default Configuration](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Screen+Shot+2015-07-06+at+03.06.08.png)

**Note: If you use the default configuration of Restivus, you can work with
default configuration**

In the first time or when you do not have a token, you will be prompted for
Credentials:

![Credential Prompt](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Screen+Shot+2015-07-06+at+03.09.21.png)

After login, you can post current page content:

![Land](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Screen+Shot+2015-07-06+at+03.11.19.png)

### Normal Usage

Just click on the icon of the extension to send current HTML content to the
webhook:

![Click](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Snip20150706_3.png)

On clicking the extension icon:

![Loading](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Screen+Shot+2015-07-06+at+03.14.36.png)

In case of error on posting to the webhook, you will get the following screen
where you can retry:

![Error](https://s3-us-west-2.amazonaws.com/kopz-projects/CodersClan/ChromeCrash/Screen+Shot+2015-07-06+at+03.16.50.png)

## Demos

- [Interaction with Meteor JS](https://www.dropbox.com/s/1w67du60i7t7xfk/OutOfBox.mov?dl=0)
- [Simple Usage](https://www.dropbox.com/s/d6rgyv9crxf2r5m/CommonUsage.mov?dl=0)
