import React,{useState} from 'react'
import { dbService, storageService } from '../fBase'

export default function Context ({contextObj, isOwner}){
    const [editing, setEditing] = useState(false)
    const [newContext, setNewContext] = useState(contextObj.context)
    const onDeleteClick = async () => {
        const ok = window.confirm("진짜 삭제할건가요?")
        if(ok){
            await dbService.doc(`rtmstoredata/${contextObj.id}`).delete()//내용지우기
            await storageService.refFromURL(contextObj.attachmentUrl).delete() // 이미지 지우기
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev)
    const onChange = (event) => {
        const{
            target:{value}
        } = event
        setNewContext(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.doc(`rtmstoredata/${contextObj.id}`).update({
            context: newContext
        })
        console.log(newContext)
        setEditing(false)
    }
    return (
    
    <div key={contextObj.id}>
        {editing ? (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={newContext}
                    placeholder="Edit" 
                    onChange={onChange}
                    required />
                <button onClick={toggleEditing}>Cancel</button>
                <button type="submit" value="Update" >Update</button>
            </form>) :
            <>
            <h4>{contextObj.context}</h4>
            {contextObj.attachmentUrl && <img src={contextObj.attachmentUrl} width="50px" height="50px" alt=""/>}
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>delete</button>
                    <button onClick={toggleEditing}>edit</button>   
                </>
            )}
            </>
        }
    </div>)
}