import { run } from '@backroad/backroad';

run((br) => {
  br.write({
    body: `# Generate images for OG`,
  });
  const [col1, col2] = br.columns({ columns: 2 });
  const title = col1.textInput({
    label: 'Title',
    placeholder: 'My awesome docs',
  });
  const description = col1.textInput({
    label: 'Description',
    placeholder: '💪Understand the power of d0xigen',
  });
});
