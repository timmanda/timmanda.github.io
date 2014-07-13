var remotedb = 'https://' + localStorage.timmanda_username + ':' + localStorage.timmanda_password + '@' +
    localStorage.timmanda_username + '.cloudant.com/timmanda';

var db = new PouchDB('timmanda'),
//remote = "http://localhost:5984/timmanda",
    remote = remotedb,
    opts = {
        continuous : true,
        adapter : 'http'
    };


function init()
{
    db.replicate.to(remote, opts);
    db.replicate.from(remote, opts);
}

function listbooks()
{
    init();

    var booklistelem = $("#booklist");

    db.allDocs({include_docs:true}, function (err, resp) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            if (resp.total_rows > 0)
            {
                var mytext = "";
                resp.rows.forEach(
                    function (entry) {
                        //booklistelem.html(entry.doc.author + '<br>' + entry.doc.book);
                        mytext += entry.doc.author + ' : ' + entry.doc.book + '<br>'
                    }
                );

                booklistelem.html(mytext);
            }
        }
    });
}

function submitMe()
{
    return false;
}

