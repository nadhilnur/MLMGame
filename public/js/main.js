$(document).ready(function(){
    $('.delete-berita').on('click', function(){
        var id = $(this).data('id');
        var url = '/delete/'+id;
        if(confirm('Delete Berita?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deleting berita...');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    });
});