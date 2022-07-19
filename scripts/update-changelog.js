const { writeFile, readFile } = require('fs/promises');

let stuffToAppend = '';

fetch(
  'https://api.github.com/repos/MajesticString/sniper/commits?per_page=100'
).then(async (res) => {
  /**
   * @type {import('./types.js').CommitRes[]}
   */
  const json = await res.json();
  json.forEach((cmt) => {
    stuffToAppend += `
## ${new Date(cmt.commit.committer.date).toLocaleString()}

### Message

${cmt.commit.message}

### Commit Info

Author: ${cmt.commit.author.name}
Comment Count: ${cmt.commit.comment_count}
`;
  });
  await writeFile(
    './docs/changelog.md',
    (await readFile('./changelog-docs-template.md')) + stuffToAppend
  );
});
