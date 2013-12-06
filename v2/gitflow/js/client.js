
$(function() {

    $.fn.serializeObject = function() {
       var o = {};
       var a = this.serializeArray();
       $.each(a, function() {
           if (o[this.name] !== undefined) {
               if (!o[this.name].push) {
                   o[this.name] = [o[this.name]];
               }
               o[this.name].push(this.value || '');
           } else {
               o[this.name] = this.value || '';
           }
       });
       return o;
    };

    $('#users-list-container').hide();

    $('#btn-show-users').click(function() {
        console.log('btn-show-users clicked')
        $('#users-list-container').hide();
        // $('#users-list-table tbody').remove();
        
        $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType : 'application/json',
            url : 'js/data.json',
            success : function(r) {
                console.log('users list response', r);
                if(r.users.length > 0) {
                    var tr;
                    // var tbody = $('<tbody/>');
                    for (var i = 0; i < r.users.length; i++) {
                        console.log('user', r.users[i])
                        tr = $('<tr/>');
                        tr.append("<td>" + r.users[i].name + "</td>");
                        tr.append("<td>" + r.users[i].age + "</td>");
                        tr.append("<td>" + r.users[i].email + "</td>");
                        tr.append("<td>" + r.users[i].address + "</td>");
                        // tr.append('<td style="background-color:'+ r.users[i].colorHex+'">' + r.users[i].color + "</td>");
                        // tbody.append(tr);
                        $('#users-list-table').append(tr);
                    }
                    // $('#users-list-table').append(tbody);
                    $('#users-list-container').show();
                }
            },
            error : function(e) {
                console.log('users list error', e);
            }
         });
    });
});