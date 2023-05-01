import React from 'react'

const DateInput = (props) => {

    let req
    props.required ? req = true : req = false

    return (
        <div className={props.className}>
            <label className="label">
                <span className="label-text">{props.name}</span>
            </label>
            <input type="date" required={req} onChange={props.onChange} className="input input-bordered w-full invalid:border-error" />
        </div>
    )
}

export default DateInput