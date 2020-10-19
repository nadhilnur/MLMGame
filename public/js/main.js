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

    $('.edit-berita').on('click', function(){
        $('#edit-form-judul_berita').val($(this).data('judul_berita'));
        $('#edit-form-konten').val($(this).data('konten'));
        $('#edit-form-kategori').val($(this).data('kategori'));
        $('#edit-form-id').val($(this).data('id'));
    });
});