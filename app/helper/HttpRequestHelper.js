
export async function Post (url, content){

    const requestOptions = 
    {
    
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    };
    console.log("POST")
            console.log(JSON.stringify(user))
            console.log(requestOptions.body);
            await fetch(
               'http://10.0.2.2:5000/login',
                requestOptions,
              ).then(response => {
                response.json().then(data => {
                Alert.alert('Post created at : ');
                }).then(console.log('loged in')).then(() => setLogin(true));
              });
            } catch (error) {
              console.error(error);
            }
          };


}