import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

const Parser = require('rss-parser');

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

// *: Move the two functions below into a separate project with separate hosting.

// fixme: Use the JSON endpoint to parse and pull all bills.
export const AllBillSync = functions.https.onRequest(async (req, resp) => {

  const parser = new Parser();

  const year = new Date().getFullYear().toString()

  const feed = await parser.parseURL('http://iga.in.gov/legislative/' + year + '/bills/feeds');
  let content = feed.items[0]['content:encoded'] as string;

  // Strip tags
  content = content.replace(/<[^>]*>/g, '');

  // Loop content split by newline
  for (const line of content.split('\n')) {
    const lineFMT = line.trim();

    if (lineFMT.indexOf('HB') === 0 || lineFMT.indexOf('SB') === 0) {
      const parts = lineFMT.split(":");
      const docId = parts[0].replace(" ", '');

      await admin.firestore().collection('bills-indiana').doc(year).collection('bills').doc(docId).set({ id: docId, name: parts[1] }, { merge: true });
    }
  }

  resp.status(200).send();
});

// fixme: Change to onCreate for the bill version
// fixme: Use the JSON endpoints vs RSS feed.
export const SingleBillSync = functions.https.onRequest(async (req, resp) => {

  const parser = new Parser();
  const year = new Date().getFullYear().toString();

  const docId = req.params.id;
  const idParts = docId.split('B');

  const side = idParts[0] === 'H' ? 'house' : 'senate';
  const billNumber = parseInt(idParts[1]);

  const feed = await parser.parseURL('http://iga.in.gov/legislative/' + year + '/bills/' + side + '/' + billNumber + '/feeds');
  let content = feed.items[0]['content:encoded'] as string;

  // Strip tags
  content = content.replace(/<[^>]*>/g, '');

  // let checklistIndex = -1;
  // let checklist = [
  //   {tag: "Authors", checked: false, sort: 0},
  //   {tag: "Co-authors", checked: false, sort: 1},
  //   {tag: "Sponsors", checked: false, sort: 2},
  //   {tag: "Co-sponsors", checked: false, sort: 3},
  //   {tag: "Bill_Actions", checked: false, sort: 4},
  //   {tag: "Digest", checked: false, sort: 5},
  // ]
  // let billData = {
  //   authors: [],
  //   coAuthors: [],
  //   sponsors: [],
  //   coSponsors: [],
  //   billActions: [],
  //   digest: ''
  // };

  // Loop content split by newline
  // for (const line of content.split('\n')) {
  //   const lineFMT = line.trim();

  //   if (lineFMT !== '') {

  //     // Check for header
  //     if (lineFMT.indexOf('HB') === 0 || lineFMT.indexOf('SB') === 0) {
  //       const parts = lineFMT.split(":");
  //       const docId = parts[0].replace(" ", '');

  //       //await admin.firestore().collection('bills-indiana').doc(year).collection('bills').doc(docId).set({ id: docId, name: parts[1] }, { merge: true });
  //     }
  //   }
  // }

  resp.status(200).send();
});
