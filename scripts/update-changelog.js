const { writeFile, readFile } = require('fs/promises');
const { fetch } = require('undici');

let stuffToAppend = '';

fetch(
  'https://api.github.com/repos/MajesticString/sniper/commits?per_page=100'
).then(async (res) => {
  /**
   * @type {import('./types.js').CommitRes[]}
   */
  const json = await res.json();
  json.forEach(async (cmt) => {
    stuffToAppend += `
## ${new Date(cmt.commit.committer.date).toLocaleString()}

### Message

${cmt.commit.message}

### Commit Info

- Author: ${cmt.commit.author.name}
- Comment Count: ${cmt.commit.comment_count}

<details>
  <summary>View Diff</summary>
  ${await (await fetch(cmt.html_url + '.diff')).text()}
</details>
`;
  });
  await writeFile(
    './docs/changelog.md',
    (await readFile('./changelog-docs-template.md')) + stuffToAppend
  );
});
