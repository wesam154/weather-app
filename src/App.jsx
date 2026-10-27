import "./App.css";
import {createTheme,ThemeProvider} from "@mui/material/styles";
//react
import {useEffect,useState} from "react";

//material UI components
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

//External library
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import {useTranslation} from "react-i18next";
import "./i18n";

const theme=createTheme({
  typography:{fontFamily:["IBM"],},
});
let cancelAxios=null;
function App(){
  const{t,i18n}=useTranslation();
  const [dateAndTime,setDateAndTime]=useState("");
  const [temp,setTemp]=useState({
    number:null,
    description:"",
    min:null,
    max:null,
    icon:null,
  });
  const [locale,setLocale]=useState("ar");
  const direction= locale =="ar"? "rtl":"ltr"
  //===Event Handlers==//
  function handleLanguageClick(){
    if(locale=="en"){
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    else{
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
setDateAndTime(moment().format("MMMM DO YYY,h:mm:ss a"));
  }
  useEffect(()=>{
    i18n.changeLanguage("ar");
  },[]);
  useEffect(()=>{
    axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?lat=24.76&lon=46.56&appid=495375B59304beffd9af4c94d66e02fc",
    {
      cancelToken:new axios.CancelToken((c)=>
      {
        cancelAxios=c;
      }),
    }
    )
    .then(function (response){
      //handle success
      const responseTemp=Math.round(
        response.data.main.temp-272.15
      );
      const min=Math.round(response.data.main.temp_min-272.15);
      const max=Math.round(response.data.main.temp-max- 272.15);
      const description=response.data.weather[0].description;
      const resposeIcon=response.data.weather[0].icon;

      setTemp({
        number:responseTemp,
        min:min,
        max:max,
        description:description,
        icon:'https://openweathermap.org/img/wn/${responseIcon}@2x.png',
      });
      console.log(response);
    })
    .catch(function(error){
      //handle Error
      console.log(error);
    });
    return()=>{
      console.log("canceling");
      cancelAxios();
    };
  },[]);
  return(
    
    
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/*content container*/}
          <div 
          style={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
          }}>
            {/*card*/}
            <div 
            dir={direction}
            style={{
              width:"100%",
              background:"rgb(28 52 91/ 36%)",
              color:"white",
              padding:"10px",
              borderRadius:"15px",
              boxShadow:"0px 11px 1px rgba(0,0,0,0.05)",
            }}>
              {/*content*/}
              <div>
                {/*city &Time*/}
                <div
                style={{
                  display:"flex",
                  alignItems:"end",
                  justifyContent:"start",
                }} 
            dir={direction}

                >
                  <Typography
                  variant="h2"
                  style={{
                    marginRight:"20px",
                    fontWeight:"600",
                  }}
                  >
                    {t("cairo")}
                    </Typography>
                  <Typography
                  variant="h2"
                  style={{marginRight:"20px"}}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/*city &Time*/}
                <hr/>
                {/*Dergree& description*/}
                <div>
                  {/*Temp*/}
                  <div
                  style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                  }}
                  >
                    <Typography variant="h2"
                    style={{textAlign:"right"}}>
                      {temp.number}
                    </Typography>
                    <img src={temp.icon}/>
                  </div>
                  {/*==temp==*/}
                  <Typography variant="h6">
                    {t("temp.description")}
                  </Typography>
                  {/*min &max*/}
                  <div
                    style={{display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    }}>
                      <h5>{t("min")} :{temp.min}</h5>
                      <h5 style={{margin:"0px 5px"}}>|</h5>
                      <h5>{t("max")} :{temp.max}</h5>
                  </div>
                </div>
                {/*Degree & description*/}
                <CloudIcon
                style={{
                  fontSize:"200px",
                  color:"white",
                }}/>
              </div>
              {/*contanier of Degree +cloudIcon*/}
            </div>
            {/*==content*/}
          </div>
          {/*==card*/}
          {/*translation container*/}
          <div 
          dir={direction}
          style={{
            width:"100%",
            display:"flex",
            justifyContent:"end",
            marginTop:"20px",
          }}>
            <div>
            <Button 
            style={{color:"white"}}
            variant="text"
            onClick={handleLanguageClick}
            >
              {locale =="en"?"Arabic":"English"}
              </Button>
            </div>
          {/*translation container*/}
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}
export default App;