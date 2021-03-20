import {Background, Error,IconLogin, Text,TextButton,InputConfirm,InputPassword,TextForgotten, TextSmall,HeroBg,DivIcon,IconWarn,IconCheck,IconError,Google,VideoBg, LinkButton, Input, Submit,SocialLogo,Container } from './styles';
import LottieAnimation from '../../../lib/lottie'
import {NavLogo} from '../../Main/NavLogo'
import {BootstrapTooltip} from '../../Main/MuiHelpers/Tooltip'
import {ModalMui} from '../../Main/Modal/ModalMui'


function Pop(props) {
    
    return (
  
      <DivIcon confirm={props.confirm} show={props.warn.type !=='none'} >
        {props.warn.type === 'load' ? <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />
        :
        <div style={{position:'relative'}} className="App">
          <BootstrapTooltip placement="right"  title={props.warn.body}>
            <div style={{height:25,width:25,marginRight:-3,display:'flex',justifyContent:'center',alignItems:'center'}} > 
            {props.warn.type ==='check' ? <IconCheck/> :
              props.warn.type ==='warn' ?<IconWarn/> :
              props.warn.type ==='error' ? <IconError/>:
              <></>}
            </div>
          </BootstrapTooltip>
        </div>
        }
      </DivIcon>
    )
  
}

export default function Sign({children, ...restProps }) {
    return (
        <Background {...restProps}>
        {children}
        </Background>
    );
}

Sign.VideoBackground = function VideoBackground() {
    return(
      <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={'/videos/video.mp4'} type='video/mp4' >
            Seu browser não suporta HTML5, por favor utilizar outro para continuar navegando.
        </VideoBg>
      </HeroBg>
    )
}

Sign.Errors =  function Errors(props) {
    return(
      <Error data-testid="error"><IconError color='#fff'/>{`    ${props.error}`}</Error>
    )
}
  
Sign.Logo =  function Logo() {
    return(
      <Container>
        <NavLogo to='/'/>
      </Container>  
    )
}
  
Sign.InputEmail = function InputEmail(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <Input
          disabled={props.loading}
          placeholder="Email"
          value={props.data.emailAddress}
          onChange={({ target }) => props.onSetEmailAddress(target.value)}
          onKeyPress={props.onKerPress}
          /* onBlur={({ target }) => props.onBlurEmail(target.value)} */
          onFocus={({ target }) => props.onFocusEmail(target.value)}
          login={'none'}
        />
        {props.data.warnMessage.type !=='none' ? <Pop warn={props.data.warnMessage}/> : null}
      </div>
    )
}
  
Sign.InputPass =  function InputPass(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <InputPassword
          disabled={props.loading || !props.login || props.login ==='none'}
          ref={props.inputPass}
          type="password"
          value={props.data.password}
          autoComplete="off"
          placeholder="Senha"
          onKeyPress={props.onKerPress}
          onChange={({ target }) => props.onSetPassword(target.value)}
          login={props.login}
        />
        {props.data.warnPassMessage.type !=='none' ? <Pop warn={props.data.warnPassMessage}/> : null}
      </div>
    )
}
  
Sign.InputConfirmPass =  function InputConfirmPass(props) {
    return(
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',position:'relative'}}>
        <InputConfirm
          disabled={props.loading || !props.login || props.login !=='register'}
          ref={props.inputConfirm}
          type="password"
          value={props.data.confirmPassword}
          autoComplete="off"
          placeholder="Confirmar senha"
          onChange={({ target }) => props.onSetConfirmPassword(target.value)}
          login={props.login}
        />
        {props.data.warnConfirmMessage.type !=='none' && props.data.confirmPassword !== '' ? <Pop confirm={true} warn={props.data.warnConfirmMessage}/> : null}
      </div>
    )
}
  
Sign.ContinueButton =  function ContinueButton(props) {
    return(
      <Submit login={props.login} onClick={props.handleSignIn} type="submit" data-testid="sign-in">
        Continuar
      </Submit>
    )
}
  
Sign.ForgotPassword =  function ForgotPassword(props) {
    return(
      <TextForgotten login={props.login}>
        <TextButton onClick={()=>props.setRecoveryModal(true)} >Esqueceu a senha?</TextButton>
      </TextForgotten>
    )
}
  
Sign.Duvida =  function Duvida() {
    return(
      <TextSmall>
      Alguma duvida? Entre em contato com nossa equipe para mais informações. <LinkButton to='/' style={{color:'#bbb'}}>Saiba mais.</LinkButton>
      </TextSmall>
    )
}

Sign.RecoveryModal =  function RecoveryModal(props) {
    return(
      <ModalMui email={props.email} onClick={props.onSentRecoveryEmail} onClose={()=>props.setRecoveryModal(false)} open={props.recoveryModal || false} />
    )
}