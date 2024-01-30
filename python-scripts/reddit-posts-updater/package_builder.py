import subprocess
import platform
import shutil

def activate_virtual_environment():
    activate_command = "venv\\Scripts\\activate" if platform.system() == "Windows" else "source venv/bin/activate"
    subprocess.run(activate_command, shell=True)

def deactivate_virtual_environment():
    subprocess.run("deactivate", shell=True)

def capture_freeze_result():
    freeze_result = subprocess.run(["pip", "freeze"], stdout=subprocess.PIPE, text=True)
    return freeze_result.stdout

def write_requirements_to_file(requirements_file_name, freeze_result):
    with open(requirements_file_name, 'w') as requirements_file:
        requirements_file.write(freeze_result)

def install_requirements(target_directory, requirements_file_name):
    subprocess.run(["pip", "install", "-r", requirements_file_name, "-t", target_directory, "--upgrade"])

def copy_source_file(source_file, target_directory):
    shutil.copy(source_file, target_directory)

def create_zip_archive(target_directory, zip_file_name):
    shutil.make_archive(zip_file_name, 'zip', target_directory)

def main():
    # Path to the directory where you want to install the dependencies
    target_directory = "lambda_build/package"
    requirements_file_name = "lambda_build/requirements.txt"
    source_file = "lambda_function.py"
    zip_file_name = "lambda_build/deploy_package.zip"

    # Activate the virtual environment
    activate_virtual_environment()

    # Run pip freeze and capture the output
    freeze_result = capture_freeze_result()

    # Deactivate the virtual environment
    deactivate_virtual_environment()

    # Write the output to requirements.txt
    write_requirements_to_file(requirements_file_name, freeze_result)

    # Install requirements from requirements.txt to the target directory
    install_requirements(target_directory, requirements_file_name)

    # Copy source file to the target directory
    copy_source_file(source_file, target_directory)

    # Create a zip archive
    create_zip_archive(target_directory, zip_file_name)

if __name__ == "__main__":
    main()
