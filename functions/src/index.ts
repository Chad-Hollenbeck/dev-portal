import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';


// Initialize App
admin.initializeApp();

/**
 * Remove new users if their document doesn't exist in the users collection.
 * @author chollenbeck 2019-12-16
 */
export const ValidateNewUser = functions.auth.user().onCreate(async (user: UserRecord, _context: any) => {
  const querySnapshot = await admin.firestore().collection('users').where('email', '==', user.email).get();
  if (querySnapshot.size == 0) {
    return admin.auth().deleteUser(user.uid);
  }

  return null;
});

export const GithubSync = functions.https.onRequest( (req, resp) => {

  const data = req.body;

  const repoData: any = {
    id: data.id,
    name: data.name,
    url: data.url,
    description: data.description
  };

  resp.status(200).send();
});
