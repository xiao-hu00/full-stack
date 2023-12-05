import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore
} from "quicktype-core";
import fs from 'node:fs'
import process from 'node:process'
import { readdir } from 'node:fs/promises'
import path from "node:path";
import util from 'node:util'
import child_process from 'node:child_process'
const exec = util.promisify(child_process.exec)
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

async function quicktypeJSON(targetLanguage, typeName, jsonString) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
      name: typeName,
      samples: [jsonString]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
      inputData,
      lang: targetLanguage,
      rendererOptions: {
        'just-types': true
      }
  });
}

async function quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  return await quicktype({
      inputData,
      lang: targetLanguage
  });
}



async function main() {
  try {
    const files = await readdir('./json');
    const fileList = process.argv.slice(2) // 传递的参数名称
    // 有传递参数，则只使用这些文件作为 input 然后生成类型文件
    // 没有传递参数，则读取json文件夹下面的所有文件作为 input
    const list = fileList.length > 0 ? fileList : files
    console.log('input file list: ', list)

    if (list.length === 0) {
      console.log('没有输入的json格式文件')
      return
    }

    for (const file of list) {
      console.log(file);
      const outputName = file.replace('.json', '.ts')
      let typeName = file.replace('.json', '')
      typeName = typeName[0].toUpperCase() + typeName.substring(1)
      // await exec('quicktype ./json/' + file + ' -o ./type/' + outputName +' --just-types')
      const filePath = path.resolve('./json/' + file)
      const jsonString = fs.readFileSync(filePath)
      const { lines: typescriptPerson } = await quicktypeJSON("typescript", typeName, jsonString);
      // console.log(typescriptPerson.join("\n"));
      console.log('writing files: ', outputName)
      // write file
      const controller = new AbortController();
      const { signal } = controller;
      const data = new Uint8Array(Buffer.from(typescriptPerson.join("\n")));
      const promise = writeFile('./type/' + outputName, data, { signal });

      // Abort the request before the promise settles.
      // controller.abort();

      await promise;
      console.log('write finish')
    }
  } catch (err) {
    console.log(err)
  }
  

  // const { lines: pythonPerson } = await quicktypeJSONSchema("python", "Person", jsonSchemaString);
  // console.log(pythonPerson.join("\n"));
}

main();