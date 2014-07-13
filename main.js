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
                var mytext = booklistelem.html();
                resp.rows.forEach(
                    function (entry) {
                        mytext += '<tr>';
                        mytext += '<td align="right" style="width:30%">' + entry.doc.author + '</td>';
                        mytext += '<td>' + entry.doc.book + '</td>';
                        mytext += '</tr>';
                    }
                );

                booklistelem.html(mytext);
            }
        }
    });
}

function addbook()
{
    var authorstr = $("#authorname").val();
    var bookstr   = $("#bookname").val();
    if (authorstr && bookstr)
    {
        db.post({
            author : authorstr,
            book : bookstr
        }, function (err,resp) {  });
    }

    return false;
}

