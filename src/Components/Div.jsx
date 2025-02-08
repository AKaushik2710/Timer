export default function Div(props){
    const {id, clickHandler, children} = props;
    return <div id={id} onClick={clickHandler}>{children}</div>
}