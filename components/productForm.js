import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm(
{_id,title: existingTitle,description : existingDescription,price : existingPrice,images,category : assignedCategory,properties: assignedProperties,}){
const [title,setTitle]= useState(existingTitle || '');
const [description,setDescription]= useState(existingDescription || '');
const [category,setCategory]= useState(assignedCategory || '');
const [productProperties,setProductProperties]= useState(assignedProperties || {});
const [price,setPrice]= useState(existingPrice || '');
const [goToProducts,setGoToProducts]= useState(false);
const [categories,setCategories]= useState([]);
const router= useRouter();
useEffect(() =>{
    axios.get('/api/categories').then(result =>{
    setCategories(result.data); 
    })
},[])
async function saveProduct(ev) {
ev.preventDefault();
const data = {title, description, price,category,properties: productProperties};
if(_id){
await axios.put('/api/products', {...data,_id});
}else{
await axios.post('/api/products', data);
}
setGoToProducts(true);

}
if(goToProducts){
router.push('/products');
}
async function uploadImages(ev){
const files= ev.target?.files;
if(files?.length > 0) {
    const data = new FormData();
    for(const file of files){
    data.append('file', file);
    }
    const res = await axios.post('/api/upload', data);
    console.log(res);
}
}
function setProductProp(propName,value){
setProductProperties(prev=>{
    const newProductProps={...prev};
    newProductProps[propName]= value;
    return newProductProps;
})
}
const propertiesToFill = [];
if(categories.length > 0 && category){
let catInfo = categories.find(({_id})=> _id=== category);
propertiesToFill.push(...catInfo.properties);
while(catInfo?.parent?._id){
const parentCat= categories.find(({_id})=> _id=== catInfo?.parent?._id);
propertiesToFill.push(...parentCat.properties);
catInfo = parentCat;
}
}
return(
    <form onSubmit={saveProduct}>
    <label>Product Name</label>
    <input placeholder="Product Name" type="text" 
    value= {title} onChange= {ev => setTitle(ev.target.value)}></input>
    <label>Category</label>
    <select value={category}
            onChange={ev =>setCategory(ev.target.value)}>     
    <option value="">Uncategorised</option>
     {categories.length > 0 && categories.map(c =>(
    <option key={c.id} value={c._id}>{c.name}</option>
        ))};
    </select>
    {propertiesToFill.length > 0 && propertiesToFill.map( p=>(
        <div key={p.id} className="">
        <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
        <div>
        <select value={productProperties[p.name]} onChange={ev =>setProductProp(p.name, ev.target.value)}>
            {p.values.map(v=>(
            <option key={v.id} value={v}>{v}</option>
        ))}
        </select>
        </div>
        </div>
    )
    )}
    <label>
        Photos
    </label>
    <div className="mb-2">
       <label className="w-24 h-24 cursor-pointer bg-gray-200 flex items-center justify-center text-sm gap-1.5 text-gray-500 rounded-md">
        <svg className="w-6 h-6"aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg><div>Upload</div>
    <input type="file"onChange={uploadImages} className="hidden"></input>
        </label> 
    {!images?.length &&(<div>
        No Photos in This Product</div>)}
    </div>
    
    <label>Product Description</label>
    <textarea placeholder="Description" value= {description} onChange= {ev => setDescription(ev.target.value)}></textarea>
    <label>Product Price (in DA)</label>
    <input placeholder="Price" type="number" value= {price} onChange= {ev => setPrice(ev.target.value)}></input>
    <button className="btn-primary" type="submit">Save</button>
    </form>
);
}