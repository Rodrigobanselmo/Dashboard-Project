function Pop(props) {
    const popover = (
      <Popover style={{opacity: props.warn.type !=='none' ? 1:0}} id="popover">
        {props.warn?.title && props.warn.title !=='' && <Popover.Title style={{marginBottom:0}} as="h3">{props.warn.title}</Popover.Title>}
        <Popover.Content>
          {props.warn.body}
        </Popover.Content>
      </Popover>
    );
    
    return (
  
      <DivIcon show={props.warn.type !=='none'} >
        {props.warn.type === 'load' && <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />}
        <div style={{position:'relative'}} className="App">
          <OverlayTrigger placement="right" overlay={popover}>
            <div style={{height:25,width:25,marginRight:-3}} > 
            {props.warn.type ==='check' ? <IconCheck/> :
              props.warn.type ==='warn' ?<IconWarn/> :
              props.warn.type ==='error' ? <IconError/>:
              <></>}
            </div>
          </OverlayTrigger>
        </div>
      </DivIcon>
    )
  
}