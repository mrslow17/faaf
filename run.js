const bluebird = require("bluebird");
const fs = require("fs");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const puppeteer = require("puppeteer-extra");
const useProxy = require("@stableproxy/puppeteer-page-proxy");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const IDRIVE_ENPOINT = "d4b6.or4.idrivee2-60.com";
const IDRIVE_ACCESS_KEY_ID = "5ce3lLJdmdBVLqcX7RPD";
const IDRIVE_SECRET_ACCESS_KEY = "a6USwSGtrxBDlV2n19XUJWcMt69ivtpu5zm63Hfi";
const BUCKET_NAME = "alchemy-dwi-cookies";

const CONCURENCY = 2;
const HEADLESS = false; // HEADLESS  false or false;

const USE_PROXY = false;
const PROTOCOL = "http";
const PROXY_HOST = "gate.smartproxy.com";
const PROXY_PORT = "7000";
const PROXY_USERNAME = "spoj3coqzt";
const PROXY_PASSWORD = "ttZaB35y17tG~Ocsdw";

const dataAccount = `
indianajens@bravemoh.tech,@@Masuk123#oZ,0xaeb76cb1f92ec4eb3f30b2d64a8dc5da1118d97a
bronovec@bravemoh.tech,@@Masuk123#oZ,0xc47a6355448435bf06b6d95b28e524db7a21f836
shade1269@bravemoh.tech,@@Masuk123#oZ,0x2a4aa8ed1ccf5dd84226535e09be6c9e9c4cb260
costacomercial@bravemoh.tech,@@Masuk123#oZ,0xb59451a2ba5f0e89c6c0ddda563b2638d02b814d
obifbf@bravemoh.tech,@@Masuk123#oZ,0x2a291e19ade4010dbdca17aff304490de06362aa
valentinmaloletov@bravemoh.tech,@@Masuk123#oZ,0xc0b4d9c6d6b42e22a47880a6b0c947383ba96444
maximuspower@bravemoh.tech,@@Masuk123#oZ,0xc8d4326305cd74498326454ff2d3f7bc13a593ce
petey2369@bravemoh.tech,@@Masuk123#oZ,0xd289887524fac288929f44be033930ce12fe1186
bonzo325@bravemoh.tech,@@Masuk123#oZ,0x71d578407f676bd973ccd160562f927d26146e97
dimalogist@bravemoh.tech,@@Masuk123#oZ,0x73c2ec3b8d93d30547d14effd3453b33c94252d9
j1py@bravemoh.tech,@@Masuk123#oZ,0x93a99c054e94e3b9b7131469e7545c150c6f2a51
nen16@bravemoh.tech,@@Masuk123#oZ,0x77c7c175b63d4b3044395c9faa47c82516189d3b
ksalamon@bravemoh.tech,@@Masuk123#oZ,0x83a3ba845255c4d6e3f199948087cf0f79a3ad1f
yalely@bravemoh.tech,@@Masuk123#oZ,0x13d6a65840a2132299e4a8f3621bc35b6b2dfa31
kelburn@bravemoh.tech,@@Masuk123#oZ,0x435a7fbcd8a9005742c311f57b6a18fbb077d9da
deitro@bravemoh.tech,@@Masuk123#oZ,0xd3bb651e1a7e03f1164f31f6422c0c62f51dbd09
aysialashawnjames@bravemoh.tech,@@Masuk123#oZ,0x663ee585aca00f32373d5c9a3de7962777db0369
jonnypeters0@bravemoh.tech,@@Masuk123#oZ,0xa43fe5e24278462d514d580891edd7423d24bf6a
jwsockwell@bravemoh.tech,@@Masuk123#oZ,0xf1897de2fc69fe97e7b99ba0e9b378f8c9b8087d
cshann@bravemoh.tech,@@Masuk123#oZ,0x895e985da037784e01bb4f445ab97f90ccfadaef
romaha9@bravemoh.tech,@@Masuk123#oZ,0x74418e755bf91c11d518a9859ffc161bf9fe6ae0
pcoldoinitzin@bravemoh.tech,@@Masuk123#oZ,0x22a05714b41a0b058523471900b1107b9ed54722
mauisurfergurl@bravemoh.tech,@@Masuk123#oZ,0xc3aa7ba337cd9e67324eeffba2f65e3f13e08a01
drmohammedbennani@bravemoh.tech,@@Masuk123#oZ,0xd494e8339fc59f125e329d67b7e9fecf5cb0aa50
parvangel@bravemoh.tech,@@Masuk123#oZ,0xf95589761b9726dc97747f2d39f01986e87f722d
serenaz122sa@bravemoh.tech,@@Masuk123#oZ,0xadf4f0fb760d2125d56b791663de5826212e0213
pdomz@mailto.plus,@@Masuk123#oZ,0x192405795145f65e3fe7d528d74f4af9adcf4f37
ep4j5nbd@bravemoh.tech,@@Masuk123#oZ,0x6d05fa9e07d5de850d8762314879e15f07a2a904
aforizm78@bravemoh.tech,@@Masuk123#oZ,0x1327ee9fa3888ec39ca395c91563d35140269b57
avballer14@bravemoh.tech,@@Masuk123#oZ,0xd83f211a55221a2d81fd4e0a326c87d781847eda
adanio@bravemoh.tech,@@Masuk123#oZ,0x5b958d1be3273bcd0d8e7d6e79b2a9bb1061347a
prohorovavikusha@bravemoh.tech,@@Masuk123#oZ,0xff18eae981e207305d63adc3dcceedba23b4c76e
h365h@bravemoh.tech,@@Masuk123#oZ,0x71332ec1246883c3bd8b85971c6e707017a71701
chamblisashing@bravemoh.tech,@@Masuk123#oZ,0x9c0bccc8e7594b10ff1bbb0c056e5f79a690650d
nikomisa@bravemoh.tech,@@Masuk123#oZ,0xf4aa7d7f50baee5ed04483b4bebb56a6dd6d3ab1
gribanovairen@bravemoh.tech,@@Masuk123#oZ,0x9b03d12541ac552e61bf7349f605502ae07866c9
antonokrema@bravemoh.tech,@@Masuk123#oZ,0x3b58bd34367a80a5176397da6825a9a2ea984177
jeffstier@bravemoh.tech,@@Masuk123#oZ,0xff6cd96f5748a23167f25d83b41ff0e88031018f
efpankov@bravemoh.tech,@@Masuk123#oZ,0xba9a282bd5ee83170bd3e2dd3eac8359cab33ffc
rambo999@bravemoh.tech,@@Masuk123#oZ,0xa375f6a21613bbd8f0f0e6fcf0b822c4ddb3c1a0
probulia@bravemoh.tech,@@Masuk123#oZ,0xea22a0fea5e6d92ca9336b98d836b1e923edcfb9
arturrosi@bravemoh.tech,@@Masuk123#oZ,0x7169a0c84510909e0a6d7d903eae9a42d098d5c6
cmcdo23268@bravemoh.tech,@@Masuk123#oZ,0xdd29c4208c405047f0ab3f37260af0855451ad0f
sarumanher@bravemoh.tech,@@Masuk123#oZ,0xacca64fddb2d3c464912808ecc60a22b20f24e1a
firemand@bravemoh.tech,@@Masuk123#oZ,0xf29a8af758081370cc8c6d972e0e9bf7076a955c
maitejimenez002@bravemoh.tech,@@Masuk123#oZ,0x6a5acb47a9b3df7afe0bd680dc5705d7bd8b7f5b
ldn429753@bravemoh.tech,@@Masuk123#oZ,0x852f307880283fa75a9d0bb05679678ce883feef
ylleprey@bravemoh.tech,@@Masuk123#oZ,0x0ec798d70310afa221f604294141bcdb82701d28
bhammer@bravemoh.tech,@@Masuk123#oZ,0x54463d0055e8712665699a76aa884dc16f9265bb
vocwarck@bravemoh.tech,@@Masuk123#oZ,0xbd1812bfa2a5b09f5fe6cb515b1cf79adee9cded
smtsmt@bravemoh.tech,@@Masuk123#oZ,0xef567888faaa0e6f31704feb8fc1cbd19e24d905
snipivanov@bravemoh.tech,@@Masuk123#oZ,0x1448aac12a0f2e37f8818d9d30e7fea0d1faaad6
puare7@bravemoh.tech,@@Masuk123#oZ,0x5de3ff0453a52ccfe3985298ece2772169d711e9
silvercat@bravemoh.tech,@@Masuk123#oZ,0x3090cf8125237468cc71cb8e22836020500e4c91
kosach1984@bravemoh.tech,@@Masuk123#oZ,0xe772846bdfe7d1ee1362e12c7b88c31a6fca1539
ss173m@bravemoh.tech,@@Masuk123#oZ,0x9b931cf2edf9a280bfcce4051e0daaa8a599a722
nedotty@bravemoh.tech,@@Masuk123#oZ,0xac35c58b83556cea57a67dbbfbe8a4c5e320d270
geoffstr@bravemoh.tech,@@Masuk123#oZ,0x1bd8c6227e403b440d1c2a6abb53307706288dfe
thorpula@bravemoh.tech,@@Masuk123#oZ,0x44423c88fdcd94aecffa020926407804089126d1
ocltc@bravemoh.tech,@@Masuk123#oZ,0xb5c6b114cd65c1685d654b4c81cf513c11a5c665
maysagadam@bravemoh.tech,@@Masuk123#oZ,0x4a4043f8f01a6dbfd4d82aa2a7c3ad4a34baa88a
vitalinochkasmil@bravemoh.tech,@@Masuk123#oZ,0x12a0c20a022d0f8294a4a5bc4db952e1940b4d89
sekeccz@bravemoh.tech,@@Masuk123#oZ,0x339bda0ce4ed915a66d9415502dd8306a744dd28
billabocooby@bravemoh.tech,@@Masuk123#oZ,0xa52e3e865add359dde2842d22f6ea3633b0cb8a8
lovelost@bravemoh.tech,@@Masuk123#oZ,0x13e6d823558d758d7cc8e3ddd8be6d9bbb1a6bcb
thaizabrito19@bravemoh.tech,@@Masuk123#oZ,0xaeee10e5736bde7fec4d4273b585fd440a5d9214
gatesoft@bravemoh.tech,@@Masuk123#oZ,0x4eafbfdc1f7be4353f59c3dbbafabf60d5179af5
cmosbios24@bravemoh.tech,@@Masuk123#oZ,0x3629f1f532c8f58c0542321083a7eb4f9e1e416b
ticondri@bravemoh.tech,@@Masuk123#oZ,0xe972daf6d8830d9055c9996e890c9b4630bf7efd
upktmx@bravemoh.tech,@@Masuk123#oZ,0x308b64ea617618aa29d00317f0feca0c2df9ac02
serzhsheshukov@bravemoh.tech,@@Masuk123#oZ,0x503849c3c20879d96807b4a041901f6e30103f86
vipom@bravemoh.tech,@@Masuk123#oZ,0x1a74c84970f77c1fed088348530308aef5878dc2
vlitzinger@bravemoh.tech,@@Masuk123#oZ,0x20dc8214627427a391efd9d1d6e9fbb9e72a4d07
nlopez185@bravemoh.tech,@@Masuk123#oZ,0x32586061e566d3a472b8c0bc05fcf4e6ff92d05c
rukhaberg@bravemoh.tech,@@Masuk123#oZ,0xb817ba7627e19aeadc72312e048b4bc8697349b1
neonilian@bravemoh.tech,@@Masuk123#oZ,0x807ec4ce4b7f9124bda80424182adf5f245abe45
nikitakalinin@bravemoh.tech,@@Masuk123#oZ,0x5af73cf751ad1d4f51203224370c64024bc420c7
ronkz650@bravemoh.tech,@@Masuk123#oZ,0xe07f462c62e9f7d47d07d0c086a6dd304be7a3c6
proknight@bravemoh.tech,@@Masuk123#oZ,0xd0c33ece9655f4498588d5f8c78253aedf0b0423
otto66@bravemoh.tech,@@Masuk123#oZ,0xbd6d46d65ab5a0315bbb5016f722b12ec741dae3
steevo70@bravemoh.tech,@@Masuk123#oZ,0x75a659100c3f4aab864dbc0ea09c8bfc8e08f3fa
952266744@bravemoh.tech,@@Masuk123#oZ,0x97b8c7a59d1005d6c90764b422039e613798e574
deathden12@bravemoh.tech,@@Masuk123#oZ,0xc6a9dd4da0a9a5d5e43ca2835858fed9f42d6d8a
drjones99@bravemoh.tech,@@Masuk123#oZ,0xbd10097f33f51f5e4c1370a7e8a273668d1812c3
stevenj123@bravemoh.tech,@@Masuk123#oZ,0x24377adcf23f23e1a51dc0fe8fe0b1996520bc57
jomagalv@bravemoh.tech,@@Masuk123#oZ,0xecdafd922aad4447e48a0cfbd17b3d6459d5682b
rmhancock@bravemoh.tech,@@Masuk123#oZ,0x456b84cfa55e843de9e67e97d31b2ee871377f8e
mcgreen87@bravemoh.tech,@@Masuk123#oZ,0x8fcc3dbd7dbcecf3fd69c11b59cee18ff2ccac33
bsd0ot@bravemoh.tech,@@Masuk123#oZ,0x1b655f268218310ad0aac240b0ada6e3800899fd
doogiep@bravemoh.tech,@@Masuk123#oZ,0x8e3b0104728a768246beb7f182092b9614c65533
tosunins@bravemoh.tech,@@Masuk123#oZ,0x12f6b57e9eab77e63c7d31cc993b9b1108f2dbac
goddammit4@bravemoh.tech,@@Masuk123#oZ,0x21189f75ccd0bd1d1175e81c445f90ec2f608f66
ab105435086@niceminute.com,@@Masuk123#oZ,0x738b610c662a94a04fb2f3b4795b8c1e151349ad
hateniners@niceminute.com,@@Masuk123#oZ,0x8e874915f044a6c244faab1054fbce4a697766dc
odfilpe@niceminute.com,@@Masuk123#oZ,0xaf8f2ed413d2841b4023b878a8f653f8f4533dea
elrj@niceminute.com,@@Masuk123#oZ,0xd652c596c488de929176be0d980909054f3cd0d4
olgatol@niceminute.com,@@Masuk123#oZ,0xcbd05f55e6538f82f08d4d50e9a7e9047636a7b2
knsydbv@niceminute.com,@@Masuk123#oZ,0x5626a31baa386b9fafe53e9eaa12b7b57dbb4883
sulaima1219@niceminute.com,@@Masuk123#oZ,0x357afad920c899c1c179d9f1b057099d988a88ca
gentryr@niceminute.com,@@Masuk123#oZ,0xd6d951df0403ce4260c493eb8e9feadb854dda90
`;

const waiting = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getData = (data, start, end) => {
  const splitData = data.split(/\r?\n/).filter((n) => n);
  const sliceData = splitData.slice(start, end);
  return sliceData;
};

const s3 = () => {
  const endpoint = new AWS.Endpoint(IDRIVE_ENPOINT);
  const s3 = new AWS.S3({
    endpoint: endpoint,
    accessKeyId: IDRIVE_ACCESS_KEY_ID,
    secretAccessKey: IDRIVE_SECRET_ACCESS_KEY,
  });

  return s3;
};

const existsBucket = async (bucketName) => {
  try {
    await listObjects(bucketName);

    return true;
  } catch (err) {
    if (err.code == "NoSuchBucket") {
      return false;
    } else {
      throw err;
    }
  }
};

const listObjects = (bucketName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
    };

    s3().listObjects(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getObject = (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
    };

    s3().getObject(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createObject = async (obj, bucketName, fileName) => {
  const buf = Buffer.from(JSON.stringify(obj));

  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "application/json",
      ACL: "private",
    };

    s3().upload(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const checkExistsObject = async (bucketName, fileName) => {
  try {
    await getObject(bucketName, fileName);

    return true;
  } catch (err) {
    if (err && (err.code == "NoSuchKey" || err.code == "NoSuchBucket"))
      return false;
  }
};

const saveCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const reaponseCookies = await session.send("Network.getAllCookies");

  await session.detach();
  await createObject(reaponseCookies.cookies, BUCKET_NAME, cookieFile);
};

const loadCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const cookies = JSON.parse(cookieFile);
  await session.send("Network.setCookies", {
    cookies: cookies,
  });
  await session.detach();
};

const retryElement = async (page, element, xpath = false, retryCount = 1) => {
  try {
    if (xpath) {
      return await page.waitForXPath(element, { timeout: 8000 });
    } else {
      return await page.waitForSelector(element, { timeout: 8000 });
    }
  } catch (err) {
    if (retryCount <= 0) {
      throw err;
    }
    const currentUrl = await page.url();
    await page.goto(currentUrl, { waitUntil: "networkidle2" });

    return await retryElement(page, element, (xpath = false), retryCount - 1);
  }
};

const launchBrowser = async () => {
  try {
    let browser;

    let args = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-notifications",
      "--no-first-run",
      "--disable-gpu",
      // "--start-maximized",
      "--disable-infobars",
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ];

    const proxyHost = `${PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`;

    USE_PROXY ? args.push(`--proxy-server=${proxyHost}`) : null;

    let browserOptions = {
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: HEADLESS,
      ignoreHTTPSErrors: true,
      acceptInsecureCerts: true,
      defaultViewport: null,
      args: args,
    };

    browser = await puppeteer.launch(browserOptions);
    const context = browser.defaultBrowserContext();

    context.overridePermissions("https://auth.alchemy.com", [
      "geolocation",
      "notifications",
    ]);
    context.overridePermissions("https://www.alchemy.com", [
      "geolocation",
      "notifications",
    ]);

    const [page] = await browser.pages();

    if (USE_PROXY) {
      await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
      });
    }

    await page.setRequestInterception(true);
    const rejectRequestPattern = [
      "googlesyndication.com",
      "/*.doubleclick.net",
      "/*.amazon-adsystem.com",
      "/*.adnxs.com",
      "/*.ads.net",
    ];
    const blockList = [];
    page.on("request", (request) => {
      if (
        rejectRequestPattern.find((pattern) => request.url().match(pattern))
      ) {
        blockList.push(request.url());
        request.abort();
      } else request.continue();
    });

    return { page, browser };
  } catch (err) {
    console.log(`Browser ${err}`);
  }
};

const login = async (page, email, password) => {
  try {
    await page.goto("https://www.alchemy.com/faucets/arbitrum-sepolia", {
      waitUntil: "networkidle2",
    });

    const cookieFile = `${email}.json`;

    const isExistCookies = await checkExistsObject(BUCKET_NAME, cookieFile);

    if (isExistCookies) {
      const getCookies = await getObject(BUCKET_NAME, cookieFile);
      const cookies = getCookies.Body.toString("utf-8");
      await loadCookies(page, cookies);
    }

    await waiting(5000);

    const logoutButtonElm = await page.$$eval("button", (button) => {
      const logoutButton = button.find(
        (btn) => btn.textContent.trim() == "Logout"
      );

      if (logoutButton) {
        return true;
      }

      return false;
    });

    if (logoutButtonElm) {
      return true;
    }

    await page.$$eval("button", (button) => {
      const loginButton = button.find(
        (btn) => btn.textContent.trim() == "Alchemy Login"
      );

      if (loginButton) {
        loginButton.focus();
        loginButton.click();
      }
    });

    await waiting(10000);

    try {
      await retryElement(page, 'input[type="email"]');

      const inputUser = await page.$('input[type="email"]');
      await page.evaluate((user) => {
        user.focus();
        user.click();
      }, inputUser);
      await page.keyboard.type(email);

      const inputPass = await page.$('input[type="password"]');
      await page.evaluate((pass) => {
        pass.focus();
        pass.click();
      }, inputPass);
      await page.keyboard.type(password);

      await page.waitForSelector('button[type="submit"]');
      const buttonLogin = await page.$('button[type="submit"]');

      await page.evaluate((login) => {
        login.click();
      }, buttonLogin);

      await waiting(15000);

      await saveCookies(page, cookieFile);
    } catch (err) {}

    return true;
  } catch (err) {
    console.log(`[${email}] - Login error ${err}`);
  }
};
const claimFoucet = async (page, email, wallet) => {
  let success = false;
  let retry = 0;
  let maxTry = 3;
  let message = "";

  try {
    while (!success && retry <= maxTry) {
      await waiting(2000);

      await retryElement(page, 'form input[type="text"]');
      const walletInputElm = await page.$('form input[type="text"]');

      await page.evaluate((walletInput) => {
        walletInput.focus();
        walletInput.click();
      }, walletInputElm);

      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
      await page.keyboard.sendCharacter(wallet);

      await page.waitForXPath('//div/button[contains(., "Send Me ETH")]');

      const [sendButtonElm] = await page.$x(
        '//div/button[contains(., "Send Me ETH")]'
      );

      await waiting(2000);

      await sendButtonElm.click();

      await waiting(4000);

      const successClaimElm = await page.$x(
        '//*[@id="root"]/div[1]/div[2]/div[3]/div[2]/div/div[2]/div/div[2]'
      );

      if (successClaimElm !== "undefined" && successClaimElm.length > 0) {
        console.log(`[${email}] - BERHASIL CLAIM ARBIT !!`);
        success = true;
        return true;
      } else {
        const [spanMessageElm] = await page.$x('//div[@role="alert"]/span');

        let textMessage = await page.evaluate(
          (element) => element.textContent.trim(),
          spanMessageElm
        );

        message = textMessage;

        retry++;

        await waiting(3000);
      }
    }

    console.log(`[${email}] - GAGAL CLAIM ARBIT ${message}`);
    return true;
  } catch (err) {
    console.log(`[${email}] - TERJADI ERROR: ${err}`);
  }
};

const bot = async (page, account) => {
  let success = false;
  try {
    await page.bringToFront();
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await client.send("Page.enable");
    await client.send("Page.setWebLifecycleState", { state: "active" });

    const data = account.split(",");
    const email = data[0];
    const password = data[1];
    const wallet = data[2];

    const sigin = await login(page, email, password);

    if (sigin) {
      success = await claimFoucet(page, email, wallet);
    }

    return success;
  } catch (err) {
    console.log(err);
  }
};
(async () => {
  const args = process.argv;

  // const startData = parseInt(args[2]);
  // const endData = parseInt(args[3]);

  // if (!startData && !endData) {
  //   console.log(`Params require "node run.js 0 5"`);
  //   process.exit();
  // }

  // For github action
  const rangeDate = process.env.RANGE_INDEX;
  const splitDate = rangeDate.split(",");
  const startData = splitDate[0];
  const endData = splitDate[1];

  const accounts = getData(dataAccount, startData, endData);

  return bluebird.map(
    accounts,
    async (account) => {
      const { page, browser } = await launchBrowser();

      try {
        await bot(page, account);
      } catch (err) {
        await browser.close();
      }

      await browser.close();
    },
    { concurrency: CONCURENCY }
  );
})();
