from flask import Flask, render_template, send_file
import os

app = Flask(__name__)

# ── Routes ───────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/download-cv')
def download_cv():
    """Téléchargement du CV PDF.
    Le fichier doit être placé dans :
        static/cv/joseph_haccandy_cv.pdf
    """
    cv_path = os.path.join(app.static_folder, 'cv', 'joseph_haccandy_cv.pdf')

    if not os.path.exists(cv_path):
        return (
            "CV non trouvé. Placez le fichier PDF dans static/cv/joseph_haccandy_cv.pdf",
            404
        )

    return send_file(
        cv_path,
        as_attachment=True,
        download_name='Joseph_Haccandy_CV.pdf',
        mimetype='application/pdf'
    )


# ── Dev server ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True, port=5000)
