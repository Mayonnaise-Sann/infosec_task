

const plaintext = "这是测试的文本";
// 公钥
var encrypt = new JSEncrypt();
encrypt.setPublicKey("-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArunBP3eDc6lo3ekn/ARR37bOugB+FHWdaLibCWQCzZwY0dYohGfz7aTi+d0ZDmBXolWfvY5i6slCpOqsMRi248EeawQbw7vYyBO2dcGx0Ni39iWtLoHJZWHVJNbmtBzPw+89WfKLB1T5isL8MROOuAWq8ow+qEsBVzzESN9QASQRQouOV08dxZ0tylnO/wK7w0DzTAfGpxZPPb21o6SNOE4aKGyrAYIO6qLOYo3XLOBj1Xh9KF1GR8kPTz3MK8PwBIa77oUJeepobePRAHWLS4OBvwGLSJNpR+hjnJdAhEYQjBIAKPH1lPcyeAEJycVj0FXchhyy3YfwnwJUNy6UzQIDAQAB -----END PUBLIC KEY-----");
// 私钥
var decrypt = new JSEncrypt();
decrypt.setPrivateKey("-----BEGIN PRIVATE KEY----- MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu6cE/d4NzqWjd6Sf8BFHfts66AH4UdZ1ouJsJZALNnBjR1iiEZ/PtpOL53RkOYFeiVZ+9jmLqyUKk6qwxGLbjwR5rBBvDu9jIE7Z1wbHQ2Lf2Ja0ugcllYdUk1ua0HM/D7z1Z8osHVPmKwvwxE464BaryjD6oSwFXPMRI31ABJBFCi45XTx3FnS3KWc7/ArvDQPNMB8anFk89vbWjpI04ThoobKsBgg7qos5ijdcs4GPVeH0oXUZHyQ9PPcwrw/AEhrvuhQl56mht49EAdYtLg4G/AYtIk2lH6GOcl0CERhCMEgAo8fWU9zJ4AQnJxWPQVdyGHLLdh/CfAlQ3LpTNAgMBAAECggEAAvL8CCbqt3uGwh8ZRn2IJ958M9SoS44EHmzmaE0gYvkbzgXvXvQlv78E+LOKpZxoPdt1uwt4jX7hOcifKKDDDKoH6kQCd9Vl/VGfxPKEHgJZb7QI7HzRuXzhzCI3d5f4xNP209psD66WGonZGLa8tEucK0TEFbBWEHN818G0JqC+5/lYqI2QxGpOS4SZPoeWFlDF1C3VsgqYRqEJZ+WGKPHJ9xXE3EtQ3j3lpi3WA9yFRC0eW605BqZd5BI7ALrEfUJ2HwAjL2dSFaZ/6rqIvCZlbFqqZRQqcwxaaESEuDTmbNc+p3wRJOAW9haeGgNYg1sstW5Z3q52I777/1n6HQKBgQDgHWr/860M9HFZxFwmZCOYVf+AuvsIl9PkAF80rArm8uNBNP7v6I5XDiitzIOcpAQZOghMYvRu6zeayCamIvyG0lRPaGL0bkgfb39AAnPxl+d9eagUiiJZD02RuA6SdH/hLEhzp/Cn3sygGE2Gq8J8rGe2JwtFnjmw3qM69v8PjwKBgQDHzFZjyNKkoTKdKE2kLGb8/dpRrhZFJ4SarlqOpsMbKHhONQ3UkSZq0PKfhqMWsflz6lmYJTAmZFqnoFCWLIKNkAlUUqQ9dozbpnP1BcdXv2T6IpPnZZSea2Mcz7NPmiv5r49Ir6Ld04jmqXifd5DMGoEELMfqk1OedUfCS4sn4wKBgQCHQTnSPr2xk9TU2CzE/qp8xWntxuq5xOecMp1CrJHnz65XLCSvpSpCX8ktGsBTSKkwkFVxxEbAqjRktWad3X+J3mYDhnwyCFx+nEuv1csjgwmyMDnAK52PIi0uRGaG/MgwnQkcw735kfzsob4oCIDXvTTaObYTzeoDVFouu+IzAQKBgQDG6gHMQGCudKouWrTJ0UcLczRLA5W6bbiQQyt3QEGYpTb5LcrCKWxlBfe3qNRvwOrIY7WlSsjgQCMdJfd1O4USqScQo2JOqttbxyFE/ObUzoEaoxg7VR+chO9c/M/ZXXWQlR+CzxHH5VUzx9+GbARln7F41ZiHSvwCE2NI5er53wKBgHXdcew85hWdfNzbDa0eFJiqNk9hQS5UwF6lDkBXlhxu/Rr2ZV54yjq7nhGH0PFhrph5RVf33BJ3O2NMGEmnsOJKTlhgNsAJAHhkrOSuVY98uK9ZBIOo6YsQ/8s7kj8DB5D0Fc7JLkJRPE7sVIFIWl72MVRJSBv2+bVBiCczb9iZ -----END PRIVATE KEY-----");


// @ 计算字符串的SHA-256散列值hash
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}
 
// 启动执行函数
(async function running() {
    console.log("loading....");
    console.log("#> START");
    
    // 1. 服务端使用摘要算法计算摘要-SHA256
    console.log("==> 1. 服务端使用摘要算法计算摘要-SHA256 ==");
    let desMsg_server;
    await digestMessage(plaintext).then(digestHex => { desMsg_server = digestHex });  
    console.log("server - " + desMsg_server)

    // 2. 服务端加密,摘要
    console.log("==> 2. 服务端加密,摘要 ==");

    var encrypted = encrypt.encrypt(desMsg_server);   
    // console.log(encrypted);

    // 3. 客户端解密,摘要
    console.log("==> 3. 客户端解密,摘要 ==");

    var uncrypted = decrypt.decrypt(encrypted);  
    console.log(uncrypted);

    // 4. 客户端使用摘要算法计算明文摘要
    console.log("==> 4. 客户端使用摘要算法计算明文摘要 ==");

    let desMsg_client;
    await digestMessage(plaintext).then(digestHex => { desMsg_client = digestHex });  // 摘要
    console.log("client - " + desMsg_client);

    // 5. 验证明文摘要和服务端加密的摘要-boolean
    console.log("==> 5. 验证明文摘要和服务端加密的摘要-boolean ==");
    let verify = desMsg_client == uncrypted;
    console.log(verify);
    if (verify) console.log("数字签名验证通过。")
    else console.log("Worning！传输信息被篡改！")

    console.log("#> END");
}())


