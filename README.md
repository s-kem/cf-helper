# cf-helper
Helper functions for CF apps. The main use cases I've had for this since I wrote it two years ago has been scraping my cloud foundry environment and creating a `VCAP_SERVICES="{}"` statement to drop into a `.env` file in my node applications in order to mimic my non-prod CF envioronments locally, and to generate `cups` and `uups` commands for my apps when I need to migrate them across cloud foundry spaces or update the bindings.

This has not been released on public `npm`, so you'll have to install it from the source.

See args for more details

## Installation (Global)
* Clone project, then from within project directory:

    * run `npm install`
    * run `npm run build`
    * run `npm install -g .`

## Usage:
cf-helper [OPTIONS]... [FILE]

### Arguments:
### The only argument given without a flag is the command to run. The following commands are accepted:

### gen-export
Generates an export VCAP_SERVICES statement based on input type.  This can be used to simulate the Cloud Foundry environment locally and keep certain sensitive items (i.e. Client ID/Secrets) out of source code.

You can take the output and:
* Put it into a file that you will source later.  For example, the file is named *myGenServices* then to use it:
```
source myGenServices
```
* Copy it to the command line for the shell you need the environment variable.

### gen-cups
Generates a list of cf cups commands for each binding in either the provided VCAP_SERVICES, or the one scraped from the app(s) given by name from your local cf target. Future versions should allow scraping of an entire cf target space, rather than apps. Currently only prints to console.
### gen-uups
Generates a list of cf uups, otherwise similar to gen-cups.


####Additional arguments:

#### --file input_file_name
The path and name of a desired input file containing a valid VCAP_SERVICES object. Currently only generating an export from this is supported.
#### -o output_file_name
The path and name of a desired output file. Currently only works when generating an export statement.

#### --cfapps cf_app_name,[1...n]
The name of a Cloud Foundry app to use for the input source.
This argument takes precedence over any input file argument.
When using this argument, make sure you're targeting the cf environment you want.
You can add multiple cf app names and the app will merge them together. Multiples need to be comma separated, with NO SPACES.

For example:
```
    cf-helper gen-export --cfapps app1,app2,app3 -o output_file
```

## For Development:

### Usage Without Installation
node cf-helper/bin/main-module.js [OPTIONS]... [FILE]

