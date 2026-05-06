import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';
import '../config/syllabus_config.dart';

class SyllabusProvider extends ChangeNotifier {
  List<Subject> _subjects = [];
  bool          _loaded   = false;
  String?       _error;

  List<Subject> get subjects => _subjects;
  bool          get loaded   => _loaded;
  String?       get error    => _error;

  List<Subject> byClass(String classLevel) =>
      _subjects.where((s) => s.classLevel == classLevel && s.isActive).toList();

  int get plus1Count => byClass('+1').length;
  int get plus2Count => byClass('+2').length;

  Future<void> loadIfNeeded() async {
    if (_loaded) return;
    await load();
  }

  Future<void> load() async {
    _error    = null;
    _subjects = SyllabusConfig.getSubjects();
    _loaded   = true;
    notifyListeners();
  }
}
