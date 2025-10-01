import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Tab, Tabs } from '@mui/material';

function StepVPN({ isActive, toggleStep, stepNumber }) {
  const [vpnStatus, setVpnStatus] = useState('');

  useEffect(() => {
    const checkVpn = () => {
      axios.get('https://ifconfig.me/ip')
        .then(response => {
          const ip = response.data;
          if(ip.startsWith('193.219.95.')) {
            setVpnStatus('connected');
          } else if(ip.startsWith('158.129.172.')) {
            setVpnStatus('knf-network');
          } else {
            setVpnStatus('disconnected');
          }
        })
        .catch(error => {
          console.error('Error fetching IP:', error);
          setVpnStatus('error');
        });
    };

    checkVpn();
    const intervalId = setInterval(checkVpn, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <li className="relative mb-10">
      {/* Step connector line */}
      <div className={`absolute left-3.5 top-12 w-0.5 bg-gray-300 transition-all ${
        isActive ? 'h-[calc(100%-3rem)]' : 'h-[calc(100%-2.5rem)]'
      }`}></div>
      
      {/* Step number badge */}
      <div className="absolute top-3 left-0 h-7 w-7 rounded-full bg-[#7A1342] text-white flex items-center justify-center text-sm font-normal">
        {stepNumber}
      </div>

      {/* Step title */}
      <div 
        className="cursor-pointer py-4 px-11 ml-0 -mx-6 font-medium hover:bg-gray-100 transition-colors"
        onClick={toggleStep}
      >
        VU VPN
      </div>

      {/* Step content */}
      {isActive && (
        <div className="ml-10 mr-6 mt-2">
          {vpnStatus === 'connected' && (
            <div className="text-center bg-green-600 text-white leading-10 rounded">
              VU VPN ĮJUNGTAS
            </div>
          )}

          {vpnStatus === 'disconnected' && (
            <div>
              <p className="mb-2"><b>Jums reikia prisijungti prie VU VPN</b></p>
              <span>Prisijungimo instrukciją rasite šioje nuorodoje: </span>
              <div className="text-center bg-red-600 text-white leading-10 rounded mt-2">
                VU VPN NĖRA ĮJUNGTAS
              </div>
            </div>
          )}

          {vpnStatus === 'knf-network' && (
            <div>
              <p className="mb-2"><b>Jūs esate Kauno fakulteto tinkle</b></p>
              <div className="text-center bg-red-600 text-white leading-10 rounded">
                VU VPN NĖRA ĮJUNGTAS
              </div>
            </div>
          )}

          {vpnStatus === 'error' && (
            <p className="text-red-600">Nepavyko patikrinti VPN būsenos</p>
          )}
        </div>
      )}
    </li>
  );
}

function StepGetIPAddress({ isActive, toggleStep, stepNumber }) {
  return (
    <li className="relative mb-10">
      {/* Step connector line */}
      <div className={`absolute left-3.5 top-12 w-0.5 bg-gray-300 transition-all ${
        isActive ? 'h-[calc(100%-3rem)]' : 'h-[calc(100%-2.5rem)]'
      }`}></div>
      
      {/* Step number badge */}
      <div className="absolute top-3 left-0 h-7 w-7 rounded-full bg-[#7A1342] text-white flex items-center justify-center text-sm font-normal">
        {stepNumber}
      </div>

      {/* Step title */}
      <div 
        className="cursor-pointer py-4 px-11 ml-0 -mx-6 font-medium hover:bg-gray-100 transition-colors"
        onClick={toggleStep}
      >
        Kompiuterio IP adresas
      </div>

      {/* Step content */}
      {isActive && (
        <div className="ml-10 mr-6 mt-2">
          <p className="mb-4">
            Jums reikia kompiuterio IP adreso į kūrį jungsitės:<br/>
            - Jei esate studentas kreipkitės į dėstytoją.<br/>
            - Jei esate darbuotojas kreipkitės į IT skyrių.
          </p>
          <p>IP Adresas atrodys panašiai kaip: <b>158.129.172.XXX:XXXX</b></p>
        </div>
      )}
    </li>
  );
}

function StepInstallApp({ isActive, toggleStep, stepNumber }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    const os = navigator.platform.toLowerCase();
    if (os.includes('mac')) {
      setTabIndex(0);
      console.log("[*] Detected mac");
    } else if (os.includes('win')) {
      setTabIndex(1);
      console.log("[*] Detected Windows");
    } else {
      setTabIndex(2);
      console.log("[*] OS Detection failed");
    }
  }, []);

  return (
    <li className="relative mb-10">
      {/* Step connector line */}
      <div className={`absolute left-3.5 top-12 w-0.5 bg-gray-300 transition-all ${
        isActive ? 'h-[calc(100%-3rem)]' : 'h-[calc(100%-2.5rem)]'
      }`}></div>
      
      {/* Step number badge */}
      <div className="absolute top-3 left-0 h-7 w-7 rounded-full bg-[#7A1342] text-white flex items-center justify-center text-sm font-normal">
        {stepNumber}
      </div>

      {/* Step title */}
      <div 
        className="cursor-pointer py-4 px-11 ml-0 -mx-6 font-medium hover:bg-gray-100 transition-colors"
        onClick={toggleStep}
      >
        Nuotolinio darbalaukio programėlė
      </div>

      {/* Step content */}
      {isActive && (
        <div className="ml-10 mr-6 mt-2">
          <Box>
            <Tabs
              style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "20px",
                borderColor: "rgb(123, 0, 63)"
              }}
              indicatorColor="primary"
              value={tabIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "rgb(123, 0, 63)",
                  height: "100%",
                  zIndex: -1,
                  borderRadius: "15px",
                  textColor: "black"
                }
              }}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: "rgb(123, 0, 63) !important" },
                '& .Mui-selected': { color: "white !important"}
              }}
            >
              <Tab value={0} style={{color: "black", fontWeight: "bold"}} disableRipple label="Mac OS" />
              <Tab value={1} style={{color: "black", fontWeight: "bold"}} disableRipple label="Windows" />
              <Tab value={2} style={{color: "black", fontWeight: "bold"}} disableRipple label="Kita" />
            </Tabs>
          </Box>
          
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Box style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
              <p className="mb-4">Susidiekite šią programą iš Apple "App Store":</p>
              <img src="macRemote.png" className="w-3/4" alt="Mac Remote Desktop" />
            </Box>

            <Box style={{ display: tabIndex === 1 ? 'block' : 'none' }}>
              <p className="mb-4">Start Meniu paieškoje įveskite: <b>"Remote Desktop Connection"</b> ir atidarykite šią programą</p>
              <img src="winRemote.png" className="w-3/4" alt="Windows Remote Desktop" />
            </Box>

            <Box style={{ display: tabIndex === 2 ? 'block' : 'none' }}>
              <p>Instrukcija sukurta nuotoline prieiga tik MacOS ir Windows operacinėms sistemoms.</p>
            </Box>
          </Box>
        </div>
      )}
    </li>
  );
}

function StepAppConfiguration({ isActive, toggleStep, stepNumber }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <li className="relative mb-0">
      {/* Step number badge */}
      <div className="absolute top-3 left-0 h-7 w-7 rounded-full bg-[#7A1342] text-white flex items-center justify-center text-sm font-normal">
        {stepNumber}
      </div>

      {/* Step title */}
      <div 
        className="cursor-pointer py-4 px-11 ml-0 -mx-6 font-medium hover:bg-gray-100 transition-colors"
        onClick={toggleStep}
      >
        Prisijungimas
      </div>

      {/* Step content */}
      {isActive && (
        <div className="ml-10 mr-6 mt-2">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              style={{
                borderStyle: "solid",
                borderWidth: "2px",
                borderRadius: "20px",
                borderColor: "rgb(123, 0, 63)"
              }}
              indicatorColor="primary"
              value={tabIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "rgb(123, 0, 63)",
                  height: "100%",
                  zIndex: -1,
                  borderRadius: "15px",
                  textColor: "black"
                }
              }}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: "rgb(123, 0, 63) !important" },
                '& .Mui-selected': { color: "white !important"}
              }}
            >
              <Tab value={0} style={{color: "black", fontWeight: "bold"}} disableRipple label="Mac OS" />
              <Tab value={1} style={{color: "black", fontWeight: "bold"}} disableRipple label="Windows" />
              <Tab value={2} style={{color: "black", fontWeight: "bold"}} disableRipple label="Kita" />
            </Tabs>
          </Box>
          
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Box style={{ display: tabIndex === 0 ? 'block' : 'none' }}>
              <p className="mb-4">
                Paleiskite <b>"Microsoft Remote Desktop"</b> programą <br/>
                kurią sudiegėte praejusiame žingsnyje:
              </p>
              <p className="mb-4">Toliau sukurte naują prisijungimą:</p>
              <img src="confMac1.png" className="w-3/4 mb-4" alt="Mac Config 1" />
              <p className="mb-4"><br/>Suveskite jums suteikto kompiuterio IP adresą</p>
              <img src="confMac2.png" className="w-3/4 mb-4" alt="Mac Config 2" />
              <p className="mb-4">
                <br/>Spustelkite mygtuką <b>"ADD"</b><br/>
                Tada suveskite savo studento/darbuotojo prisijungimo <br/>
                skaičių ir slaptažodį kaip nurodyta paveiksliuke
              </p>
              <img src="confMac3.png" className="w-3/4 mb-4" alt="Mac Config 3" />
              <p>
                <br/>Spustelkite mygtuką <b>"Continue"</b>turėtų pavykti prisijungti.<br/>
                Jei nepavyksta, patikrinkite <b>VU VPN</b> žingsnį, ir jei vistiek<br/>
                nepavyksta prisijungti praneškite dėstytojui arba sistemos administratoriui.
              </p>
            </Box>

            <Box style={{ display: tabIndex === 1 ? 'block' : 'none' }}>
              <p className="mb-4">Start Meniu paieškoje įveskite: <b>"Remote Desktop Connection"</b> ir atidarykite šią programą</p>
              <img src="winRemote.png" className="w-3/4" alt="Windows Remote Desktop" />
            </Box>

            <Box style={{ display: tabIndex === 2 ? 'block' : 'none' }}>
              <p>Nuotolinė prieiga veikia MacOS ar Windows operacinėse sistemos.</p>
            </Box>
          </Box>
        </div>
      )}
    </li>
  );
}

function App() {
  const [activeStep, setActiveStep] = useState('vpn-step');

  const toggleStep = (stepName) => {
    setActiveStep(stepName);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <ul className="list-none p-0">
        <StepVPN 
          isActive={activeStep === 'vpn-step'} 
          toggleStep={() => toggleStep('vpn-step')}
          stepNumber={1}
        />
        <StepGetIPAddress 
          isActive={activeStep === 'getip-step'}
          toggleStep={() => toggleStep('getip-step')}
          stepNumber={2}
        />
        <StepInstallApp 
          isActive={activeStep === 'install-app-step'}
          toggleStep={() => toggleStep('install-app-step')}
          stepNumber={3}
        />
        <StepAppConfiguration
          isActive={activeStep === 'connect-step'}
          toggleStep={() => toggleStep('connect-step')}
          stepNumber={4}
        />
      </ul>
    </div>
  );
}

export default App;
