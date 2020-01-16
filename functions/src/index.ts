import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

//const http = require('request');

//const repoHooks = ['branches', 'tags', 'commits']

// Initialize App
admin.initializeApp();

/**
 * Remove new users if their document doesn't exist in the users collection.
 * @author chollenbeck 2019-12-16
 */
export const ValidateNewUser = functions.auth.user().onCreate(async (user: UserRecord, _context: any) => {
  const querySnapshot = await admin.firestore().collection('users').where('email', '==', user.email).get();
  if (querySnapshot.size === 0) {
    return admin.auth().deleteUser(user.uid);
  }

  return null;
});

export const GithubSync = functions.https.onRequest(async (req, resp) => {

  const body = req.body;

  if (!body) {
    resp.send(204);
  }

  const data = body.repository;

  const repoData: any = {
    id: "r" + data.id,
    name: data.name,
    git_url: data.url,
    html_url: data.html_url,
    description: data.description,
    createDate: data.created_at,
    updateDate: data.updated_at,
    size: data.size,
    openIssues: data.open_issues_count,
    language: data.language
  };

  await admin.firestore().collection('repository').doc(repoData.id).set(repoData);

  resp.send(200);

});
