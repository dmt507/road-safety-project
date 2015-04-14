
<!-- define the project's URL (to make AJAX calls possible, even when using this in sub-folders etc) -->
<script>
    var url = "<?php echo URL; ?>";
</script>

<script src="<?php echo URL; ?>public/js/bootstrap.min.js"></script>

<script type="text/javascript">
    current_url= window.location;
    $('ul.nav a').filter(function() {
        return this.href == current_url;
    }).parent().addClass('active');
</script>

</body>
</html>
