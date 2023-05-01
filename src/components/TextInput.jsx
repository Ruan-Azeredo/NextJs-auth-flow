import React from 'react'
import ReactInputMask from 'react-input-mask'

const TextInput = (props) => {

    // maxWidth deve ser max-w-sm, max-w-md, max-w-lg ...

    let req, classReq
    if(props.required) {
        req = true
        classReq = "after:content-['*'] after:ml-0.5 after:text-error"
    } else {
        req = false
    }

    return (
        <div className={props.ClassName}>
            <label className="label">
                <span className={`label-text ${classReq}`}>{props.name}</span>
            </label>
            <ReactInputMask type="text" required={req} placeholder={props.placeholder} onChange={props.onChange} mask={props.mask} className={`input input-bordered w-full ${props.maxWidth}`} />
        </div>
    )
}

export default TextInput