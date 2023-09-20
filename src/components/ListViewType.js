import {TiThLargeOutline, TiThList} from 'react-icons/ti'


const ListViewType = props => {

    const onChangeViewTypeHandler = (id) => {
        if(props.listType !== id)
            props.setViewType(id)
      }

    return (
        <div className="w-[20%] my-4 border-b-2 to-black">
            <div className='w-full flex flex-row justify-end space-x-2 cursor-pointer'>
                <TiThLargeOutline size={20} color={props.listType === 'card'?`blue` : `black`} onClick={() => onChangeViewTypeHandler('card')}/>
                <TiThList size={20} color={props.listType === 'list'?`blue` : `black`} onClick={() => onChangeViewTypeHandler('list')}/>
            </div>
        </div>
    )
}

export default ListViewType;