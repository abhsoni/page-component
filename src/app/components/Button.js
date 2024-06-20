function Button({text,doneBtnHandler}){
    return <button className="py-2.5 bg-[#FFCE22] rounded" onClick={doneBtnHandler}>{text}</button>
}
export default Button;