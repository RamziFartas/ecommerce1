import { mongooseConnect } from '../../lib/mongoose';
import multiparty from 'multiparty';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req,res){
  await mongooseConnect();
  await isAdminRequest(req,res);
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({fields,files});
      });
    });
console.log('length', files.file.length);

for(const file of files.file){
const ext= file.originalFilename.split('.').pop();
const newFilename = Date.now() +'.'+ ext;
console.log({ext,file});
}
return res.json('ok');
}
export const config= {
api:{bodyParser:false},
};