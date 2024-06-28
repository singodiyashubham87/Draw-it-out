import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const useGoogleDrive = () => {
    useEffect(() => {
      const initClient = () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          scope: SCOPES,
        }).then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        });
      };
      gapi.load("client:auth2", initClient);
    }, []);

    const signIn = () => {
      return gapi.auth2.getAuthInstance().signIn();
    };

    const uploadFile = (file) => {
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function () {
        const contentType = file.type || 'application/octet-stream';
        const metadata = {
          'name': file.name,
          'mimeType': contentType,
        };

        const base64Data = btoa(reader.result);
        const multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n' +
          'Content-Transfer-Encoding: base64\r\n' +
          '\r\n' +
          base64Data +
          close_delim;

        gapi.client.request({
          'path': '/upload/drive/v3/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
          },
          'body': multipartRequestBody
        }).then((response) => {
          console.log(response);
          alert('File uploaded to Google Drive!');
        });
      }
    };

    return { signIn, uploadFile };
  };

  export default useGoogleDrive;