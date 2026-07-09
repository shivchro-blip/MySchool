plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "net.yadhum.app"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "net.yadhum.app"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = 34
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    val keystorePath = System.getenv("KEYSTORE_PATH")

    signingConfigs {
        create("release") {
            storeFile = keystorePath?.let { file(it) }
            storePassword = System.getenv("KEYSTORE_PASSWORD")
            keyAlias = System.getenv("KEY_ALIAS")
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }

    buildTypes {
        release {
            // Guard against a silent unsigned/debug-signed release lives in the
            // taskGraph.whenReady block below — it must not fire at configuration
            // time or it breaks debug builds too.
            signingConfig = if (keystorePath != null) signingConfigs.getByName("release") else null
        }
        debug {
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

// Hard-fail release builds when the keystore is not configured. Runs after task
// selection, so debug-only invocations (e.g. `flutter run` → assembleDebug) are
// unaffected by KEYSTORE_PATH being unset.
gradle.taskGraph.whenReady {
    val releaseRequested = allTasks.any {
        it.project == project && it.name.contains("Release")
    }
    if (releaseRequested && System.getenv("KEYSTORE_PATH") == null) {
        throw GradleException(
            "KEYSTORE_PATH not set — refusing to fall back to debug signing for release build"
        )
    }
}

flutter {
    source = "../.."
}
