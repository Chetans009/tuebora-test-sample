const Tabs = (props) => {
  const onSetTabHandler = (id) => {
    if(props.activeType !== id)
        props.setTab(id)
  }

  return (
    <div>
      <ul className="nav nav-tabs">
        {props.types.map((type) => {
          return (
            <li
              className="nav-item cursor-pointer"
              key={type.name}
            >
              <a className={`${
                props.activeType == type.id ? "active " : ""
              } nav-link `} aria-current="page" href="#" onClick={() => onSetTabHandler(type.id)}>
                {type.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
