import './style.css';
import * as monaco from 'monaco-editor';
import * as jsonToYaml from 'json-to-pretty-yaml';

const diffEditor = monaco.editor.createDiffEditor(document.getElementById('app')!, {
  readOnly: true,
});

const input1 = document.getElementById('input1')!;
const input2 = document.getElementById('input2')!;

let originalYAML = '';
let modifiedYAML = '';

input1.addEventListener('change', async (e) => {
  const file = await readFile((e.target as HTMLInputElement).files);
  originalYAML = jsonToYaml.stringify(JSON.parse(file));

  const original = monaco.editor.createModel(originalYAML, 'yaml');
  const modified = monaco.editor.createModel(modifiedYAML, 'yaml');

  diffEditor.setModel({
    original,
    modified,
  });
});
input2.addEventListener('change', async (e) => {
  const file = await readFile((e.target as HTMLInputElement).files);
  modifiedYAML = jsonToYaml.stringify(JSON.parse(file));

  const original = monaco.editor.createModel(originalYAML, 'yaml');
  const modified = monaco.editor.createModel(modifiedYAML, 'yaml');

  diffEditor.setModel({
    original,
    modified,
  });
});

async function readFile(files: FileList | null): Promise<string> {
  if (!files) {
    return Promise.resolve('');
  }

  const fr = new FileReader();

  const result = new Promise<string>((resolve) => {
    fr.onload = () => {
      resolve(fr.result as string);
    }
  });

  fr.readAsText(files[0]);

  return result;
}
