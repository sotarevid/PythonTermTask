def run():
    from . import create_app
    app = create_app()
    app.run()


run()
