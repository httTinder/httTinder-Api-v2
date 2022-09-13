import "dotenv/config";

export function htmlBody(
  token: string,
  message: string,
  reset: boolean = false
) {
  let link = process.env.BASE_URL;

  if (reset === true) {
    link = process.env.BASE_RESET;
  }

  const email = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
     <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Confirm Account KenzieLover!</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     </head>
     <body style="margin: 0; padding: 0; ">
          <!-- HEADER -->
          <table bgcolor="#D7234D" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
               <tr>
                    <td align="center" height="200">
                         <img src="https://res.cloudinary.com/dtgkjo5sy/image/upload/v1663086085/logos/Logo_httTinder_itbf44.png" alt="Kenzie Love" style="display: block;" />
                    </td>
               </tr>
               <!-- MAIN BODY -->
               <tr>
                    <td bgcolor=" #D7234D" style="padding: 2em;">
                         <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <hr>
                              <tr>
                                   <td align="center" style=" font-weight: 600; color: #ffffff; font-family: Arial, sans-serif; font-size: 1.5em; padding-top: 2em;">
                                        ${message}
                                   </td>
                              </tr>
                              <tr>
                                   <td align="center" style="padding: 3em 0 1em;">
                                        <button style="background-color: #F299B9; border-radius: 10px; border: 0; padding: 1em 2em;  font-family: Arial, sans-serif; font-size: 1.5rem; ">
                                             <!-- precisa redirecionar para pagina com a rota + token -->
                                             <a style="text-decoration: none; font-weight: 600; color: #ffffff;" href="${link}${token}" target="_blank">Confirm account</a>
                                        </button>
                                   </td>
                              </tr>
                              <tr>
                                   <td>
                                        <img src="https://res.cloudinary.com/dtgkjo5sy/image/upload/v1663086085/logos/loveGhost_log09q.png" alt="" width="60%" style="display: block;" />
                                   </td>
                              </tr>
                              <!-- RODAPE -->
                              <tr>
                                   <td align="bottom" bgcolor="#D7234D" style="padding: 2em 2em 0;">
                                        <hr>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                             <tr>
                                                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 1rem;">
                                                       &reg; Kenzie Love, Made With Love 2022<br />
                                                       <a href="#" style="color: #ffffff;">
                                                            <font color="#ffffff">
                                                                 Unsubscibre</font>
                                                       </a>to this e-mail
                                                  </td>
                                             </tr>
                                        </table>
                                   </td>
                              </tr>
                         </table>
     </body>
</html>`;

  return email;
}
