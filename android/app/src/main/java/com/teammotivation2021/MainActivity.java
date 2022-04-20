package com.affinityinteractive.dgpi;

import com.facebook.react.ReactActivity;
import android.view.WindowManager;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "teammotivation2021";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // getWindow().setFlags(
    //         WindowManager.LayoutParams.FLAG_SECURE,
    //         WindowManager.LayoutParams.FLAG_SECURE
    // );
  }
}
